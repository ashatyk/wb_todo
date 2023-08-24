import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { ButtonVariant, Modal, SimpleInput } from '@wildberries/ui-kit';
import {
  SimpleInputChangeEventType,
  SimpleInputKeyPressEventType,
} from '@wildberries/ui-kit/lib/simple-input/types';
import i18next from 'i18next';
import {
  ETodosLoadings,
  TodoType,
  TodoStorageSliceType,
  todosLoadingSelector,
  updateTodoSelector,
  isUpdateTodoModalOpenSelector,
  setUpdateTodoIdAction,
  updateTodoSagaAction,
} from '@/_redux/todo-slice';
import { TODO_PAGE_TRANSLATES } from '@/pages/todos/page/_constants/translations';

type MapStateOutputType = {
  updateTodoData: ReturnType<typeof updateTodoSelector>;
  isUpdateTodoModalOpen: ReturnType<typeof isUpdateTodoModalOpenSelector>;
  isLoading: ReturnType<typeof todosLoadingSelector>;
};

type MapDispatchType = {
  updateTodo: typeof updateTodoSagaAction;
  setUpdateTodoId: typeof setUpdateTodoIdAction;
};

type PropsType = MapStateOutputType & MapDispatchType;
const WrappedComponent = ({
  updateTodoData,
  isLoading,
  isUpdateTodoModalOpen,
  setUpdateTodoId,
  updateTodo,
}: PropsType) => {
  const [todoForm, setTodoForm] = useState<TodoType>(updateTodoData);
  const todoUpdateDisabled = todoForm?.title?.trim().length === 0;

  const handleUpdateTodoModalCloseClick = useCallback(() => {
    setUpdateTodoId(null);
  }, [setUpdateTodoId]);
  const onUpdateTodoClick = useCallback(() => {
    updateTodo(todoForm);
  }, [todoForm, updateTodo]);

  const handleNewTodoInputValueChange = ({
    value,
  }: SimpleInputChangeEventType) => {
    setTodoForm((form) => ({
      ...form,
      title: value,
    }));
  };

  const handleTodoUpdateKeyPress = useCallback(
    ({ event }: SimpleInputKeyPressEventType) => {
      if (event.key === 'Enter') {
        if (!isLoading && !todoUpdateDisabled) updateTodo(todoForm);
      }
    },
    [isLoading, todoForm, todoUpdateDisabled, updateTodo],
  );

  const actionsConfig = useMemo(
    () => ({
      actionButton: {
        variant: 'accent' as ButtonVariant,
        onClick: onUpdateTodoClick,
        title: i18next.t(TODO_PAGE_TRANSLATES.saveButton),
        isLoading,
        disabled: isLoading || todoUpdateDisabled,
      },
      cancelButton: {
        onClick: handleUpdateTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: i18next.t(TODO_PAGE_TRANSLATES.closeButton),
      },
    }),
    [
      isLoading,
      onUpdateTodoClick,
      handleUpdateTodoModalCloseClick,
      todoUpdateDisabled,
    ],
  );

  useEffect(() => {
    setTodoForm(updateTodoData);
  }, [updateTodoData]);

  return (
    <Modal
      actionsConfig={actionsConfig}
      isOpened={isUpdateTodoModalOpen}
      isShowCloseIcon
      onClose={handleUpdateTodoModalCloseClick}
      title={`${i18next.t(TODO_PAGE_TRANSLATES.updateButton)} ${
        todoForm?.id ? todoForm?.id.slice(0, 10) : ''
      }`}
    >
      <SimpleInput
        id="update-todo-item"
        name="update-todo-item"
        onChange={handleNewTodoInputValueChange}
        onKeyPress={handleTodoUpdateKeyPress}
        placeholder="new title"
        value={todoForm?.title || ''}
      />
    </Modal>
  );
};

const mapStateToProps = (state: TodoStorageSliceType): MapStateOutputType => ({
  isLoading: todosLoadingSelector(state, ETodosLoadings.UPDATE_TODO),
  isUpdateTodoModalOpen: isUpdateTodoModalOpenSelector(state),
  updateTodoData: updateTodoSelector(state),
});

const mapDispatchToProps: MapDispatchType = {
  updateTodo: updateTodoSagaAction,
  setUpdateTodoId: setUpdateTodoIdAction,
};

export const ConnectedUpdateTodoModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedComponent);
