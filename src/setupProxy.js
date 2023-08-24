// eslint-disable-next-line
const {createProxyMiddleware} = require('http-proxy-middleware');
const WB_TOKEN = '';
const X_SUPPLIER_ID = 'fb25c9e9-cae8-52db-b68e-736c1466a3f5';
const X_USER_ID = 23508737;

const headersDev = {
  cookie: `x-supplier-id=${X_SUPPLIER_ID}; WBToken=${WB_TOKEN}`,
  'X-User-Id': X_USER_ID,
  'X-Resource-Id': 'suppliers-portal-ru',
};

module.exports = (app) => {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      headers: headersDev,
    }),
  );

  app.use(
    '/I18N',
    createProxyMiddleware({
      target: 'http://localhost:8080',
    }),
  );
};
