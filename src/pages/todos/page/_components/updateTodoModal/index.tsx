import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import {
  ButtonVariant,
  Modal,
  SimpleInput,
} from '@wildberries/ui-kit';
import {
  SimpleInputChangeEventType,
  SimpleInputKeyPressEventType,
} from '@wildberries/ui-kit/lib/simple-input/types';
import {
  ETodosLoadings,
  ITodo,
  ITodoStorageSlice,
  selectTodosLoading,
  selectUpdateTodo,
  selectUpdateTodoModalOpen,
  setUpdateTodoIdAction,
  updateTodoSagaAction
} from '@/_redux/todo-slice';

export interface IUpdateTodoModalStateProps {
  updateTodoData: ReturnType<typeof selectUpdateTodo>;
  updateTodoModalOpen: ReturnType<typeof selectUpdateTodoModalOpen>;
  loading: ReturnType<typeof selectTodosLoading>;
}

export interface IUpdateTodoModalActionsProps {
  updateTodoSagaAction: typeof updateTodoSagaAction;
  setUpdateTodoIdAction: typeof setUpdateTodoIdAction;
}

export type UpdateTodoModalPropsType = IUpdateTodoModalStateProps &
  IUpdateTodoModalActionsProps;
export const UpdateTodoModalWrapper = ({
  updateTodoData,
  loading,
  updateTodoModalOpen,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setUpdateTodoIdAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  updateTodoSagaAction,
}: UpdateTodoModalPropsType) => {
  const [todoForm, setTodoForm] = useState<ITodo>(updateTodoData);
  const todoUpdateDisabled = todoForm?.title?.trim().length === 0;

  const onUpdateTodoModalCloseClick = useCallback(() => {
    setUpdateTodoIdAction(null);
  }, [setUpdateTodoIdAction]);
  const onUpdateTodoClick = useCallback(() => {
    updateTodoSagaAction(todoForm);
  }, [todoForm, updateTodoSagaAction]);

  const onNewTodoInputValueChange = ({ value }: SimpleInputChangeEventType) => {
    setTodoForm((form) => ({
      ...form,
      title: value,
    }));
  };

  const onTodoUpdateKeyPress = ({ event }: SimpleInputKeyPressEventType) => {
    if (event.key === 'Enter') {
      if (!loading && !todoUpdateDisabled) updateTodoSagaAction(todoForm);
    }
  };

  const actionsConfig = useMemo(
    () => ({
      actionButton: {
        variant: 'accent' as ButtonVariant,
        onClick: onUpdateTodoClick,
        title: 'Save',
        isLoading: loading,
        disabled: loading || todoUpdateDisabled,
      },
      cancelButton: {
        onClick: onUpdateTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: 'Close',
      },
    }),
    [
      loading,
      onUpdateTodoClick,
      onUpdateTodoModalCloseClick,
      todoUpdateDisabled,
    ],
  );

  useEffect(() => {
    setTodoForm(updateTodoData);
  }, [updateTodoData]);

  return (
    <Modal
      actionsConfig={actionsConfig}
      isOpened={updateTodoModalOpen}
      isShowCloseIcon
      onClose={onUpdateTodoModalCloseClick}
      title={`Update todo ${todoForm?.id ? todoForm?.id.slice(0, 10) : ''}`}
    >
      <SimpleInput
        id="update-todo-item"
        name="update-todo-item"
        onChange={onNewTodoInputValueChange}
        onKeyPress={onTodoUpdateKeyPress}
        placeholder="new title"
        value={todoForm?.title || ''}
      />
    </Modal>
  );
};

export const UpdateTodoModal = connect<
  IUpdateTodoModalStateProps,
  IUpdateTodoModalActionsProps,
  Record<keyof any, never>,
  ITodoStorageSlice
>(
  (state) => ({
    loading: selectTodosLoading(state, ETodosLoadings.UPDATE_TODO),
    updateTodoModalOpen: selectUpdateTodoModalOpen(state),
    updateTodoData: selectUpdateTodo(state),
  }),
  {
    updateTodoSagaAction,
    setUpdateTodoIdAction,
  },
)(UpdateTodoModalWrapper);
