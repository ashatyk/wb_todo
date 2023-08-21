import React from 'react';
import { connect } from 'react-redux';
import { ButtonVariant, Modal } from '@wildberries/ui-kit';
import {
  ETodosLoadings,
  ITodoStorageSlice,
  selectTodosLoading,
  selectDeleteTodoModalOpen,
  selectDeleteTodoId,
  deleteTodo,
  setDeleteTodoId,
} from '@/pages/todos/todo-slice';

export interface IDeleteTodoModalStateProps {
  deleteTodoId: ReturnType<typeof selectDeleteTodoId>;
  deleteTodoModalOpen: ReturnType<typeof selectDeleteTodoModalOpen>;
  loading: ReturnType<typeof selectTodosLoading>;
}

export interface IDeleteTodoModalActionsProps {
  deleteTodo: typeof deleteTodo;
  setDeleteTodoId: typeof setDeleteTodoId;
}

export type TDeleteTodoModalProps = IDeleteTodoModalStateProps &
  IDeleteTodoModalActionsProps;
export const DeleteTodoModalWrapper: React.FC<TDeleteTodoModalProps> = ({
  deleteTodoId,
  loading,
  deleteTodoModalOpen,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setDeleteTodoId,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  deleteTodo,
}) => {
  const onDeleteTodoModalCloseClick = React.useCallback(() => {
    setDeleteTodoId(null);
  }, [setDeleteTodoId]);
  const onDeleteTodoClick = React.useCallback(() => {
    deleteTodo(deleteTodoId);
  }, [deleteTodo, deleteTodoId]);

  const actionsConfig = React.useMemo(
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
    deleteTodo,
    setDeleteTodoId,
  },
)(DeleteTodoModalWrapper);
