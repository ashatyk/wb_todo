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
  updateTodo: typeof updateTodoSagaAction;
  setUpdateTodoId: typeof setUpdateTodoIdAction;
}

export type UpdateTodoModalPropsType = IUpdateTodoModalStateProps &
  IUpdateTodoModalActionsProps;
export const UpdateTodoModalWrapper = ({
  updateTodoData,
  loading,
  updateTodoModalOpen,
  setUpdateTodoId,
  updateTodo,
}: UpdateTodoModalPropsType) => {
  const [todoForm, setTodoForm] = useState<ITodo>(updateTodoData);
  const todoUpdateDisabled = todoForm?.title?.trim().length === 0;

  const handleUpdateTodoModalCloseClick = useCallback(() => {
    setUpdateTodoId(null);
  }, [setUpdateTodoId]);
  const onUpdateTodoClick = useCallback(() => {
    updateTodo(todoForm);
  }, [todoForm, updateTodo]);

  const handleNewTodoInputValueChange = ({ value }: SimpleInputChangeEventType) => {
    setTodoForm((form) => ({
      ...form,
      title: value,
    }));
  };

  const handleTodoUpdateKeyPress = ({ event }: SimpleInputKeyPressEventType) => {
    if (event.key === 'Enter') {
      if (!loading && !todoUpdateDisabled) updateTodo(todoForm);
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
        onClick: handleUpdateTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: 'Close',
      },
    }),
    [
      loading,
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
      isOpened={updateTodoModalOpen}
      isShowCloseIcon
      onClose={handleUpdateTodoModalCloseClick}
      title={`Update todo ${todoForm?.id ? todoForm?.id.slice(0, 10) : ''}`}
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

const mapStateToProps = (state: ITodoStorageSlice): IUpdateTodoModalStateProps => ({
  loading: selectTodosLoading(state, ETodosLoadings.UPDATE_TODO),
  updateTodoModalOpen: selectUpdateTodoModalOpen(state),
  updateTodoData: selectUpdateTodo(state),
})

const mapDispatchToProps: IUpdateTodoModalActionsProps = {
  updateTodo: updateTodoSagaAction,
  setUpdateTodoId: setUpdateTodoIdAction,
}

export const ConnectedUpdateTodoModal = connect(mapStateToProps, mapDispatchToProps)(UpdateTodoModalWrapper);
