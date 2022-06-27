const routes = {
  home: '/',
  authors: '/authors',
  explore: '/explore',
  popularProducts: '/popular-products',
  about: '/about-us',
  contact: '/contact-us',
  purchases: '/purchases',
  profile: '/profile',
  checkout: '/checkout',
  help: '/help',
  licensing: '/licensing',
  refund: '/refund',
  terms: '/terms',
  privacy: '/privacy',
  password: '/password',
  productsSearch: '/products-search',
  orderUrl: (tracking_number: string) => `/orders/${tracking_number}`,
  productUrl: (slug: string) => `/products/${slug}`,
  tagUrl: (slug: string) => `/products/tags/${slug}`,
  shopUrl: (slug: string) => `/authors/${slug}`,
  productsSearchUrl: (categoryName: string) =>
    `/products-search/${categoryName}`,
};

export default routes;
