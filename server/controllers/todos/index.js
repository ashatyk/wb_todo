const { generateUUID } = require('listr2/dist/utils/uuid');
const { todosModel } = require('../../models/todos');

module.exports.todosGetController = async (req, res) => {
  const todos = await todosModel.value();
  res.status(200).json({
    todos: todos.sort((todoA, todoB) => {
      const dateA = new Date(todoA.date);
      const dateB = new Date(todoB.date);

      return dateB - dateA;
    }),
  });
};

module.exports.todosDeleteController = async (req, res) => {
  await todosModel.remove({ id: req.body.id }).write();
  res.status(200).json({});
};

module.exports.todosPostController = async (req, res) => {
  await todosModel
    .push({
      id: generateUUID(),
      title: req?.body?.title,
      createdAt: new Date().toISOString(),
      completed: false,
    })
    .write();
  res.status(200).json({});
};

module.exports.todosPutController = async (req, res) => {
  const {
    todo: { id, ...restFields },
  } = req.body;

  await todosModel.find({ id }).assign(restFields).write();
  res.status(200).json({});
};
