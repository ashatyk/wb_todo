const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const dataJSONFilePath = path.join('server', 'models', 'todos', 'data.json');
const adapter = new FileSync(dataJSONFilePath);
const database = low(adapter);

module.exports.todosModel = database;
