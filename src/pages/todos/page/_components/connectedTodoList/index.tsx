import React, { useCallback } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { SimpleInput, ButtonLink } from '@wildberries/ui-kit';
import {
  SimpleInputChangeEventType,
  SimpleInputKeyPressEventType,
} from '@wildberries/ui-kit/lib/simple-input/types';
import i18next from 'i18next';
import { TodoCard } from '@/pages/todos/page/_components/todoCard';
import {
  createTodoSagaAction,
  ETodosLoadings,
  TodoStorageSliceType,
  isCreateTodoDisabledSelector,
  newTodoInputValueSelector,
  todosSelector,
  todosLoadingSelector,
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
  setUpdateTodoIdAction,
  updateTodoSagaAction,
} from '@/_redux/todo-slice';
import { TODO_PAGE_TRANSLATES } from '@/pages/todos/page/_constants/translations';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Todos';

type MapStateOutputType = {
  todos: ReturnType<typeof todosSelector>;
  isCreateLoading: ReturnType<typeof todosLoadingSelector>;
  newTodoInputValue: ReturnType<typeof newTodoInputValueSelector>;
  isCreateDisabled: ReturnType<typeof isCreateTodoDisabledSelector>;
};

type MapDispatchType = {
  setNewTodoInputValue: typeof setNewTodoInputValueAction;
  createTodo: typeof createTodoSagaAction;
  setUpdateTodoId: typeof setUpdateTodoIdAction;
  setDeleteTodoId: typeof setDeleteTodoIdAction;
  updateTodo: typeof updateTodoSagaAction;
};

type PropsType = MapStateOutputType & MapDispatchType;
const WrappedComponent = ({
  todos,
  isCreateLoading,
  newTodoInputValue,
  setNewTodoInputValue,
  createTodo,
  setUpdateTodoId,
  setDeleteTodoId,
  updateTodo,
  isCreateDisabled,
}: PropsType) => {
  const todoCreateDisabled = newTodoInputValue.trim().length === 0;

  const handleNewTodoInputValueChange = useCallback(
    ({ value }: SimpleInputChangeEventType) => {
      setNewTodoInputValue(value);
    },
    [setNewTodoInputValue],
  );

  const handleTodoCreateClick = useCallback(() => {
    createTodo(newTodoInputValue);
  }, [createTodo, newTodoInputValue]);

  const handleTodoCreateKeyPress = useCallback(
    ({ event }: SimpleInputKeyPressEventType) => {
      if (event.key === 'Enter') {
        if (!isCreateLoading && !todoCreateDisabled)
          createTodo(newTodoInputValue);
      }
    },
    [createTodo, isCreateLoading, newTodoInputValue, todoCreateDisabled],
  );

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
              placeholder={i18next.t(TODO_PAGE_TRANSLATES.placeholder)}
              value={newTodoInputValue}
            />
          </div>
          <ButtonLink
            disabled={isCreateDisabled}
            isLoading={isCreateLoading}
            onClick={handleTodoCreateClick}
            text={i18next.t(TODO_PAGE_TRANSLATES.newTodoAddButton)}
            variant="accent"
          />
        </div>
        {todos.map(({ id, createdAt, description, completed, title }) => (
          <TodoCard
            key={id}
            completed={completed}
            createdAt={createdAt}
            description={description}
            handleDeleteTodoClick={setDeleteTodoId}
            handleUpdateTodoClick={setUpdateTodoId}
            id={id}
            title={title}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: TodoStorageSliceType): MapStateOutputType => ({
  isCreateLoading: todosLoadingSelector(state, ETodosLoadings.CREATE_TODO),
  todos: todosSelector(state),
  newTodoInputValue: newTodoInputValueSelector(state),
  isCreateDisabled: isCreateTodoDisabledSelector(state),
});

const mapDispatchToProps: MapDispatchType = {
  createTodo: createTodoSagaAction,
  setNewTodoInputValue: setNewTodoInputValueAction,
  updateTodo: updateTodoSagaAction,
  setUpdateTodoId: setUpdateTodoIdAction,
  setDeleteTodoId: setDeleteTodoIdAction,
};

export const TodosList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedComponent);
