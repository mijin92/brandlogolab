const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://ec2-3-39-64-137.ap-northeast-2.compute.amazonaws.com:8080',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};