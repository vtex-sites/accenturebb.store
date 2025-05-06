import type { NextApiRequest, NextApiResponse } from 'next'

import config from '../../../../store.config'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req?.query?.name
  const { workspace, storeId } = config.api

  try {
    fetch(
      `https://${workspace}--${storeId}.myvtex.com/_v/cms/api/faststore/${name}?page=1&per_page=10`
    )
      .then((response) => response.json())
      .then((data) => res.status(200).json(data.data))
  } catch (error) {
    res.status(400).json(`Not Found, ${error}`)
  }
}
