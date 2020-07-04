// ./graphql/typeDefs.js
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { print } = require('graphql');
const fs = require('fs');

const typesArray = loadFilesSync(path.join(__dirname, '../Api/**/*.type.js'));


module.exports = mergeTypeDefs(typesArray, { all: true });


