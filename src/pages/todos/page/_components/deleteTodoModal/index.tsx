import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { ButtonVariant, Modal } from '@wildberries/ui-kit';
import {
  deleteTodoSagaAction,
  ETodosLoadings,
  ITodoStorageSlice,
  selectDeleteTodoId,
  selectDeleteTodoModalOpen,
  selectTodosLoading,
  setDeleteTodoIdAction,
} from "@/_redux/todo-slice";

export interface IDeleteTodoModalStateProps {
  deleteTodoId: ReturnType<typeof selectDeleteTodoId>;
  deleteTodoModalOpen: ReturnType<typeof selectDeleteTodoModalOpen>;
  loading: ReturnType<typeof selectTodosLoading>;
}

export interface IDeleteTodoModalActionsProps {
  deleteTodoSagaAction: typeof deleteTodoSagaAction;
  setDeleteTodoIdAction: typeof setDeleteTodoIdAction;
}

export type DeleteTodoModalPropsType = IDeleteTodoModalStateProps &
  IDeleteTodoModalActionsProps;
export const DeleteTodoModalWrapper = ({
  deleteTodoId,
  loading,
  deleteTodoModalOpen,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setDeleteTodoIdAction,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  deleteTodoSagaAction,
}: DeleteTodoModalPropsType) => {
  const onDeleteTodoModalCloseClick = useCallback(() => {
    setDeleteTodoIdAction(null);
  }, [setDeleteTodoIdAction]);

  const onDeleteTodoClick = useCallback(() => {
    deleteTodoSagaAction(deleteTodoId);
  }, [deleteTodoSagaAction, deleteTodoId]);

  const actionsConfig = useMemo(
    () => ({
      actionButton: {
        variant: 'accent' as ButtonVariant,
        onClick: onDeleteTodoClick,
        title: 'Delete',
        isLoading: loading,
        disabled: loading,
      },
      cancelButton: {
        onClick: onDeleteTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: 'Close',
      },
    }),
    [loading, onDeleteTodoClick, onDeleteTodoModalCloseClick],
  );

  return (
    <Modal
      actionsConfig={actionsConfig}
      isOpened={deleteTodoModalOpen}
      isShowCloseIcon
      onClose={onDeleteTodoModalCloseClick}
      title={`Delete todo ${deleteTodoId ? deleteTodoId.slice(0, 10) : ''}`}
    />
  );
};

export const DeleteTodoModal = connect<
  IDeleteTodoModalStateProps,
  IDeleteTodoModalActionsProps,
  Record<keyof any, never>,
  ITodoStorageSlice
>(
  (state) => ({
    loading: selectTodosLoading(state, ETodosLoadings.DELETE_TODO),
    deleteTodoModalOpen: selectDeleteTodoModalOpen(state),
    deleteTodoId: selectDeleteTodoId(state),
  }),
  {
    deleteTodoSagaAction,
    setDeleteTodoIdAction,
  },
)(DeleteTodoModalWrapper);
