#!/usr/bin/env node
import { resolveApp } from '../util'
import program from 'commander';
import { dev,build } from '../commands';
const pageJson = require(resolveApp('package.json'));

program.version(`deer-ui-cli ${pageJson.version}`, '-v', '--version')

program.command('dev')
    .description('本地调试')
    .action(dev)
program.command('build')
    .description('构建完整版deer-ui组件库')
    .action(build)

program.parse(process.argv);