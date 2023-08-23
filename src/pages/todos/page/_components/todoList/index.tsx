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
  ETodosLoadings,
  ITodoStorageSlice,
  selectCreateDisabled,
  selectDeleteTodoId,
  selectNewTodoInputValue,
  selectTodos,
  selectTodosLoading,
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
  setUpdateTodoIdAction,
  updateTodoSagaAction
} from '@/_redux/todo-slice';
import i18next from "i18next";
import {translations} from "@/pages/todos/page/_constants/translations";

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Todos';

export interface ITodosStateProps {
  todos: ReturnType<typeof selectTodos>;
  createLoading: ReturnType<typeof selectTodosLoading>;
  deleteLoading: ReturnType<typeof selectTodosLoading>;
  deleteTodoId: ReturnType<typeof selectDeleteTodoId>;
  newTodoInputValue: ReturnType<typeof selectNewTodoInputValue>;
  createDisabled: ReturnType<typeof selectCreateDisabled>
}

export interface ITodosActionsProps {
  setNewTodoInputValue: typeof setNewTodoInputValueAction,
  createTodo: typeof createTodoSagaAction,
  setUpdateTodoId: typeof setUpdateTodoIdAction,
  setDeleteTodoId: typeof setDeleteTodoIdAction,
  updateTodo: typeof updateTodoSagaAction,
}

export type TodosPropsType = ITodosStateProps & ITodosActionsProps;
export const TodosWrapper = ({
  todos,
  createLoading,
  newTodoInputValue,
  setNewTodoInputValue,
  createTodo,
  setUpdateTodoId,
  setDeleteTodoId,
  updateTodo,
}: TodosPropsType) => {
  const todoCreateDisabled = newTodoInputValue.trim().length === 0;

  const handleNewTodoInputValueChange = ({
    value,
  }: SimpleInputChangeEventType) => {
    setNewTodoInputValue(value);
  };

  const handleTodoCreateClick = () => {
    createTodo(newTodoInputValue);
  };

  const handleTodoCreateKeyPress = ( { event }: SimpleInputKeyPressEventType) => {
    if (event.key === 'Enter') {
      if (!createLoading && !todoCreateDisabled) createTodo(newTodoInputValue);
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
              onChange={handleNewTodoInputValueChange}
              onKeyPress={handleTodoCreateKeyPress}
              placeholder={i18next.t(translations.placeholder)}
              value={newTodoInputValue}
            />
          </div>
          <ButtonLink
            disabled={todoCreateDisabled || createLoading}
            isLoading={createLoading}
            onClick={handleTodoCreateClick}
            text={i18next.t(translations.newTodoAddButton)}
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

const MemoizedTodosWrapper = memo(TodosWrapper);

const mapStateToProps = (state: ITodoStorageSlice): ITodosStateProps => ({
  createLoading: selectTodosLoading(state, ETodosLoadings.CREATE_TODO),
  deleteLoading: selectTodosLoading(state, ETodosLoadings.DELETE_TODO),
  deleteTodoId: selectDeleteTodoId(state),
  todos: selectTodos(state),
  newTodoInputValue: selectNewTodoInputValue(state),
  createDisabled: selectCreateDisabled(state),
});

const mapDispatchToProps: ITodosActionsProps =   {
  createTodo: createTodoSagaAction,
  setNewTodoInputValue: setNewTodoInputValueAction,
  updateTodo: updateTodoSagaAction,
  setUpdateTodoId: setUpdateTodoIdAction,
  setDeleteTodoId: setDeleteTodoIdAction,
};

export const Todos = connect(mapStateToProps, mapDispatchToProps)(MemoizedTodosWrapper);
