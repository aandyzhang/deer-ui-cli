import { devConfig } from '../webpack/dev.config';
import { prodConfig } from '../webpack/prod.config';
import { compileWebPack } from '../webpack/webpack';
// import logger from '../util/logger';
export async function compileSite(prod) {
    try {
        prod ? compileWebPack(prodConfig) : compileWebPack(devConfig);
        // prod && logger.success('build site success!');
    } catch (error) {
        // logger.error(error);
    }
}