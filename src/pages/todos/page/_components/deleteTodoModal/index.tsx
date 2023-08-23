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
  deleteTodo: typeof deleteTodoSagaAction;
  setDeleteTodoId: typeof setDeleteTodoIdAction;
}

export type DeleteTodoModalPropsType = IDeleteTodoModalStateProps &
  IDeleteTodoModalActionsProps;
export const DeleteTodoModalWrapper = ({
  deleteTodoId,
  loading,
  deleteTodoModalOpen,
  setDeleteTodoId,
  deleteTodo,
}: DeleteTodoModalPropsType) => {
  const handleDeleteTodoModalCloseClick = useCallback(() => {
    setDeleteTodoId(null);
  }, [setDeleteTodoId]);

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo(deleteTodoId);
  }, [deleteTodo, deleteTodoId]);

  const actionsConfig = useMemo(
    () => ({
      actionButton: {
        variant: 'accent' as ButtonVariant,
        onClick: handleDeleteTodoClick,
        title: 'Delete',
        isLoading: loading,
        disabled: loading,
      },
      cancelButton: {
        onClick: handleDeleteTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: 'Close',
      },
    }),
    [loading, handleDeleteTodoClick, handleDeleteTodoModalCloseClick],
  );

  return (
    <Modal
      actionsConfig={actionsConfig}
      isOpened={deleteTodoModalOpen}
      isShowCloseIcon
      onClose={handleDeleteTodoModalCloseClick}
      title={`Delete todo ${deleteTodoId ? deleteTodoId.slice(0, 10) : ''}`}
    />
  );
};

const mapStateToProps = (state: ITodoStorageSlice ): IDeleteTodoModalStateProps => ({
  loading: selectTodosLoading(state, ETodosLoadings.DELETE_TODO),
  deleteTodoModalOpen: selectDeleteTodoModalOpen(state),
  deleteTodoId: selectDeleteTodoId(state),
})

const mapDispatchToProps: IDeleteTodoModalActionsProps = {
  deleteTodo: deleteTodoSagaAction,
  setDeleteTodoId: setDeleteTodoIdAction,
}

export const ConnectedDeleteTodoModal = connect(mapStateToProps, mapDispatchToProps)(DeleteTodoModalWrapper);
