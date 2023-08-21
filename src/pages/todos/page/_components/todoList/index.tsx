import React from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import {
  SimpleInput,
  ButtonLink,
  ButtonClickEventType,
  SimpleInputKeyPressEventType,
} from '@wildberries/ui-kit';
import { SimpleInputPropsType } from '@wildberries/ui-kit/lib/simple-input/types';
import {
  createTodo,
  deleteTodo,
  ETodosLoadings,
  getTodos,
  ITodoStorageSlice,
  selectDeleteTodoId,
  selectNewTodoInputValue,
  selectTodos,
  selectTodosLoading,
  setDeleteTodoId,
  setNewTodoInputValue,
  setTodosLoading,
  setUpdateTodoId,
  TTodosActionProps,
  updateTodo,
} from '@/pages/todos/todo-slice';
import { TodoCard } from '@/pages/todos/page/_components/todoCard';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Todos';

export interface ITodosStateProps {
  todos: ReturnType<typeof selectTodos>;
  createLoading: ReturnType<typeof selectTodosLoading>;
  deleteLoading: ReturnType<typeof selectTodosLoading>;
  deleteTodoId: ReturnType<typeof selectDeleteTodoId>;
  newTodoInputValue: ReturnType<typeof selectNewTodoInputValue>;
}

export type TTodosProps = ITodosStateProps & TTodosActionProps;
export const TodosWrapper: React.FC<TTodosProps> = ({
  todos,
  createLoading,
  deleteLoading,
  deleteTodoId,
  newTodoInputValue,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setNewTodoInputValue,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  createTodo,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setUpdateTodoId,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setDeleteTodoId,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  updateTodo,
}) => {
  const todoCreateDisabled = newTodoInputValue.trim().length === 0;

  const onNewTodoInputValueChange: SimpleInputPropsType['onChange'] = ({
    value,
  }) => {
    setNewTodoInputValue(value);
  };

  const onTodoCreateClick: (event?: ButtonClickEventType) => void = (event) => {
    createTodo(newTodoInputValue);
  };

  const onTodoCreateKeyPress = (optionArg: SimpleInputKeyPressEventType) => {
    if (optionArg.event.key === 'Enter') {
      if (!createLoading && !todoCreateDisabled) createTodo(newTodoInputValue);
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={cn(`${BLOCK_NAME}`)}>
      <div className={cn(`${BLOCK_NAME}__wrapper`)}>
        <div className={cn(`${BLOCK_NAME}__newTodo`)}>
          <div className={cn(`${BLOCK_NAME}__input`)}>
            <SimpleInput
              id="add-todo-item"
              name="add-todo-item"
              onChange={onNewTodoInputValueChange}
              onKeyPress={onTodoCreateKeyPress}
              placeholder="New one"
              value={newTodoInputValue}
            />
          </div>
          <ButtonLink
            disabled={todoCreateDisabled || createLoading}
            isLoading={createLoading}
            onClick={onTodoCreateClick}
            text="Add"
            variant="accent"
          />
        </div>
        {todos.map(({ id, createdAt, description, completed, title }) => (
          <TodoCard
            key={id}
            completed={completed}
            createdAt={createdAt}
            description={description}
            id={id}
            onDeleteTodoClick={setDeleteTodoId}
            onUpdateTodoClick={setUpdateTodoId}
            title={title}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
};

const MemoizedTodosWrapper = React.memo(TodosWrapper) as React.FC<TTodosProps>;

export const Todos = connect<
  ITodosStateProps,
  TTodosActionProps,
  Record<keyof any, never>,
  ITodoStorageSlice
>(
  (state) => ({
    createLoading: selectTodosLoading(state, ETodosLoadings.CREATE_TODO),
    deleteLoading: selectTodosLoading(state, ETodosLoadings.DELETE_TODO),
    deleteTodoId: selectDeleteTodoId(state),
    todos: selectTodos(state),
    newTodoInputValue: selectNewTodoInputValue(state),
  }),
  {
    getTodos,
    setTodosLoading,
    createTodo,
    deleteTodo,
    setNewTodoInputValue,
    updateTodo,
    setUpdateTodoId,
    setDeleteTodoId,
  },
)(MemoizedTodosWrapper);
