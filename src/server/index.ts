/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { FormatErrorHandler } from '@envelop/core'
import {
  envelop,
  useExtendContext,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { useParserCache } from '@envelop/parser-cache'
import { useValidationCache } from '@envelop/validation-cache'
import { getContextFactory, getSchema, isFastStoreError } from '@faststore/api'
import { GraphQLError } from 'graphql'
import type {
  Maybe,
  Options as APIOptions,
  Scalars,
  CacheControl,
} from '@faststore/api'
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'

import persisted from '../../@generated/graphql/persisted.json'
import storeConfig from '../../store.config'
import typeDefs from './graphql/custom/schema'
import extendTypeDefs from './graphql/extends/schema'
import shipping from './graphql/resolvers/shipping'
import getWishlist from './graphql/resolvers/getWishlist'
import getWishListProducts from './graphql/resolvers/getWishListProducts'
import newsLetter from './graphql/resolvers/newsLetter'
import setWishlist from './graphql/resolvers/setWishlist'
import newsLetterUpdate from './graphql/resolvers/newsLetterUpdate'

interface ExecuteOptions<V = Record<string, unknown>> {
  operationName: string
  variables: V
  query?: string | null
}

const persistedQueries = new Map(Object.entries(persisted))
const apiOptions: APIOptions = {
  platform: storeConfig.platform as APIOptions['platform'],
  account: storeConfig.api.storeId,
  environment: storeConfig.api.environment as APIOptions['environment'],
  hideUnavailableItems: storeConfig.api.hideUnavailableItems,
  channel: storeConfig.session.channel,
  locale: storeConfig.session.locale,
  flags: {
    enableOrderFormSync: true,
  },
}

export const apiSchemaOld = getSchema(apiOptions)

const apiContextFactory = getContextFactory(apiOptions)

export interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: Scalars['ObjectOrString']
}

const resolvers = {
  Query: {
    shipping,
    getWishlist,
    getWishListProducts,
    newsLetter,
  },
  Mutation: {
    setWishlist,
    newsLetterUpdate,
  },
}

const getMergedSchemas = async () =>
  mergeSchemas({
    schemas: [
      await apiSchemaOld,
      makeExecutableSchema({
        resolvers,
        typeDefs,
      }),
    ],
    typeDefs: extendTypeDefs,
    resolvers: {
      StoreProduct: {
        Sellers: (root: any) => {
          return root.sellers
        },

        specificationGroups: (root: any) => {
          return root.isVariantOf.specificationGroups
        },
      },
    },
  })

export const apiSchema = getMergedSchemas()
const formatError: FormatErrorHandler = (err) => {
  if (err instanceof GraphQLError && isFastStoreError(err.originalError)) {
    return err
  }

  console.error(err)

  return new GraphQLError('Sorry, something went wrong.')
}

const getEnvelop = async () =>
  envelop({
    plugins: [
      useSchema(await getMergedSchemas()),
      useExtendContext(apiContextFactory),
      useMaskedErrors({ formatError }),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
    ],
  })

const envelopPromise = getEnvelop()

export const execute = async <V extends Maybe<{ [key: string]: unknown }>, D>(
  options: ExecuteOptions<V>,
  envelopContext = { headers: {} }
): Promise<{
  data: D
  errors: unknown[]
  extensions: { cacheControl?: CacheControl }
}> => {
  const { operationName, variables, query: maybeQuery } = options
  const query = maybeQuery ?? persistedQueries.get(operationName)

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  const enveloped = await envelopPromise
  const {
    parse,
    contextFactory,
    execute: run,
    schema,
  } = enveloped(envelopContext)

  const contextValue = await contextFactory(envelopContext)

  const { data, errors } = (await run({
    schema,
    document: parse(query),
    variableValues: variables,
    contextValue,
    operationName,
  })) as { data: D; errors: unknown[] }

  return {
    data,
    errors,
    extensions: { cacheControl: contextValue.cacheControl },
  }
}
