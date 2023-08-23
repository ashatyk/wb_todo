import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import {
  SimpleInput,
  ButtonLink,
} from '@wildberries/ui-kit';
import {
  SimpleInputChangeEventType,
  SimpleInputKeyPressEventType,
} from '@wildberries/ui-kit/lib/simple-input/types';
import { TodoCard } from '@/pages/todos/page/_components/todoCard';
import styles from './index.module.scss';
import {
  createTodoSagaAction,
  deleteTodoSagaAction,
  ETodosLoadings,
  ITodoStorageSlice,
  selectDeleteTodoId,
  selectNewTodoInputValue,
  selectTodos,
  selectTodosLoading,
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction,
  TodosActionsType,
  updateTodoSagaAction
} from '@/_redux/todo-slice';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Todos';

export interface ITodosStateProps {
  todos: ReturnType<typeof selectTodos>;
  createLoading: ReturnType<typeof selectTodosLoading>;
  deleteLoading: ReturnType<typeof selectTodosLoading>;
  deleteTodoId: ReturnType<typeof selectDeleteTodoId>;
  newTodoInputValue: ReturnType<typeof selectNewTodoInputValue>;
}

export type TodosPropsType = ITodosStateProps & TodosActionsType;
export const TodosWrapper = ({
  todos,
  createLoading,
  newTodoInputValue,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setNewTodoInputValueAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  createTodoSagaAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setUpdateTodoIdAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setDeleteTodoIdAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  updateTodoSagaAction,
}: TodosPropsType) => {
  const todoCreateDisabled = newTodoInputValue.trim().length === 0;

  const onNewTodoInputValueChange = ({
    value,
  }: SimpleInputChangeEventType) => {
    setNewTodoInputValueAction(value);
  };

  const onTodoCreateClick = () => {
    createTodoSagaAction(newTodoInputValue);
  };

  const onTodoCreateKeyPress = ( { event }: SimpleInputKeyPressEventType) => {
    if (event.key === 'Enter') {
      if (!createLoading && !todoCreateDisabled) createTodoSagaAction(newTodoInputValue);
    }
  };

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
            onDeleteTodoClick={setDeleteTodoIdAction}
            onUpdateTodoClick={setUpdateTodoIdAction}
            title={title}
            updateTodoSagaAction={updateTodoSagaAction}
          />
        ))}
      </div>
    </div>
  );
};

const MemoizedTodosWrapper = memo(TodosWrapper);

export const Todos = connect<
  ITodosStateProps,
  TodosActionsType,
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
    setTodosLoadingAction,
    createTodoSagaAction,
    deleteTodoSagaAction,
    setNewTodoInputValueAction,
    updateTodoSagaAction,
    setUpdateTodoIdAction,
    setDeleteTodoIdAction,
  },
)(MemoizedTodosWrapper);
