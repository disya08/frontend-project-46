#!/usr/bin/env node

import { program } from 'commander';
import genDiff from './src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  })
  .parse(process.argv);
  