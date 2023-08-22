const express = require('express');
const {
  todosGetController,
  todosPostController,
  todosPutController,
  todosDeleteController,
} = require('../../controllers/todos');

const todosRouter = express.Router();

todosRouter.get('/', todosGetController);
todosRouter.post('/', todosPostController);
todosRouter.put('/', todosPutController);
todosRouter.delete('/', todosDeleteController);

module.exports.todosRouter = todosRouter;
