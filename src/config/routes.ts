const routes = {
  home: '/',
  sales: '/sales',
  taxInfo: '/tax-info',
  configPrinter: '/config-printer',
  productsSearch: '/products-search',
  productsSearchUrl: (categoryName: string) =>
    `/products-search/${categoryName}`,
};

export default routes;
