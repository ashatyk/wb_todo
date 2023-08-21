const express = require('express');
const { i18nRouter } = require('./i18n');
const { todosRouter } = require('./todos');

const rootRouter = express.Router();

rootRouter.use('/todos', todosRouter);
rootRouter.use('/I18N', i18nRouter);

module.exports.rootRouter = rootRouter;
