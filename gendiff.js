#!/usr/bin/env node

const { program } = require('commander')
const genDiff = require('./src/index.js')

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format))
  })
  .parse(process.argv)

