
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

function devServer(config) {
    const compiler = Webpack(config);
    const devServerOptions = {
        open: true,
        host: 'localhost',
        stats: 'errors-only',
        publicPath: '/',
        disableHostCheck: true,
        hot: true,
        hotOnly: true,
        inline: true,
        overlay: {
            warnings: true,
            errors: true
        },
        watchOptions: {
            ignored: /node_modules/
        }
    };
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(3001, 'localhost', (err) => {
        if (err) logger.error(err);
    });
}

export function compileWebPack(config) {
    console.log('config',config)
    switch (config.mode) {
        case "development":
            devServer(config);
            break;
        case "production":
            return build(config);
    }
}