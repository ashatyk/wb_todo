import React from 'react';
import { connect } from 'react-redux';
import {
  ButtonVariant,
  Modal,
  SimpleInput,
  SimpleInputKeyPressEventType,
} from '@wildberries/ui-kit';
import { SimpleInputPropsType } from '@wildberries/ui-kit/lib/simple-input/types';
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

export type TUpdateTodoModalProps = IUpdateTodoModalStateProps &
  IUpdateTodoModalActionsProps;
export const UpdateTodoModalWrapper: React.FC<TUpdateTodoModalProps> = ({
  updateTodoData,
  loading,
  updateTodoModalOpen,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setUpdateTodoIdAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  updateTodoSagaAction,
}) => {
  const [todoForm, setTodoForm] = React.useState<ITodo>(updateTodoData);
  const todoUpdateDisabled = todoForm?.title?.trim().length === 0;

  const onUpdateTodoModalCloseClick = React.useCallback(() => {
    setUpdateTodoIdAction(null);
  }, [setUpdateTodoIdAction]);
  const onUpdateTodoClick = React.useCallback(() => {
    updateTodoSagaAction(todoForm);
  }, [todoForm, updateTodoSagaAction]);

  const onNewTodoInputValueChange: SimpleInputPropsType['onChange'] = ({
    value,
  }) => {
    setTodoForm((form) => ({
      ...form,
      title: value,
    }));
  };

  const onTodoUpdateKeyPress = (optionArg: SimpleInputKeyPressEventType) => {
    if (optionArg.event.key === 'Enter') {
      if (!loading && !todoUpdateDisabled) updateTodoSagaAction(todoForm);
    }
  };

  const actionsConfig = React.useMemo(
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

  React.useEffect(() => {
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
