module.exports = {
  seo: {
    title: 'NextJSStore',
    description: 'Fast Demo Store',
    titleTemplate: '%s | FastStore',
    author: 'Store Framework',
  },
  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: 'accenturebb',
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
  },

  // Default channel
  session: {
    currency: {
      code: 'BRL',
      symbol: 'R$',
    },
    locale: 'pt-BR',
    channel: '{"salesChannel":"1","regionId":""}',
    country: 'BRA',
    postalCode: null,
    person: null,
  },

  // Production URLs
  storeUrl: 'https://leanvtex.vtex.app',
  secureSubdomain: 'https://accenturebb.vtexcommercestable.com.br',
  checkoutUrl: 'https://accenturebb.vtexcommercestable.com.br/checkout',
  loginUrl: 'https://accenturebb.vtexcommercestable.com.br/api/io/login',
  accountUrl: 'https://accenturebb.vtexcommercestable.com.br/api/io/account',

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:9000',
    pages: {
      home: '/',
      pdp: '/iphone-13-apple--128gb--meia-noite-tela-de-61--5g-e-camera-dupla-de-12-mp-202-1500/p',
      collection: '/eletronicos',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/iphone-13-apple--128gb--meia-noite-tela-de-61--5g-e-camera-dupla-de-12-mp-202-1500/p',
      collection: '/eletronicos',
      collection_filtered:
        'eletronicos/?category-1=eletronicos&brand=apple&facets=category-1%2Cbrand&sort=score_desc&page=0',
      search: '/s?q=iphone',
    },
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: 'GTM-PGHZ95N',
  },
}
