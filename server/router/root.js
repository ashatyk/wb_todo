const express = require('express');
const { i18nRouter } = require('./i18n');
const { todosRouter } = require('./todos');

const rootRouter = express.Router();
const localizationRouter = express.Router();

rootRouter.use('/todos', todosRouter);
localizationRouter.use('/I18N', i18nRouter);

module.exports.rootRouter = rootRouter;
module.exports.localizationRouter = localizationRouter;
