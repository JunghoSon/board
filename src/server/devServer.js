const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../webpack.dev.config');

const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, config.devServer);
const port = 8081;

devServer.listen(port, () => {
    console.log('WebpackDevServer is running on port ', port);
});
