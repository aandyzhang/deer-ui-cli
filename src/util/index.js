const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export function isDev() {
  return process.env.NODE_ENV === 'development';
}