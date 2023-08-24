import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { ButtonVariant, Modal } from '@wildberries/ui-kit';
import i18next from 'i18next';
import {
  deleteTodoSagaAction,
  ETodosLoadings,
  ITodoStorageSlice,
  selectDeleteTodoId,
  selectDeleteTodoModalOpen,
  selectTodosLoading,
  setDeleteTodoIdAction,
} from '@/_redux/todo-slice';
import { translations } from '@/pages/todos/page/_constants/translations';

type MapStateOutputType = {
  deleteTodoId: ReturnType<typeof selectDeleteTodoId>;
  deleteTodoModalOpen: ReturnType<typeof selectDeleteTodoModalOpen>;
  loading: ReturnType<typeof selectTodosLoading>;
};

type MapDispatchType = {
  deleteTodo: typeof deleteTodoSagaAction;
  setDeleteTodoId: typeof setDeleteTodoIdAction;
};

type PropsType = MapStateOutputType & MapDispatchType;
export const DeleteTodoModalWrapper = ({
  deleteTodoId,
  loading,
  deleteTodoModalOpen,
  setDeleteTodoId,
  deleteTodo,
}: PropsType) => {
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
        title: i18next.t(translations.deleteButton),
        isLoading: loading,
        disabled: loading,
      },
      cancelButton: {
        onClick: handleDeleteTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: i18next.t(translations.closeButton),
      },
    }),
    [loading, handleDeleteTodoClick, handleDeleteTodoModalCloseClick],
  );

  const todoDeleteTitle = useMemo(
    () => (deleteTodoId ? deleteTodoId.slice(0, 10) : ''),
    [deleteTodoId],
  );

  return (
    <Modal
      actionsConfig={actionsConfig}
      isOpened={deleteTodoModalOpen}
      isShowCloseIcon
      onClose={handleDeleteTodoModalCloseClick}
      title={`${i18next.t(translations.deleteTodo)} ${todoDeleteTitle}`}
    />
  );
};

const mapStateToProps = (state: ITodoStorageSlice): MapStateOutputType => ({
  loading: selectTodosLoading(state, ETodosLoadings.DELETE_TODO),
  deleteTodoModalOpen: selectDeleteTodoModalOpen(state),
  deleteTodoId: selectDeleteTodoId(state),
});

const mapDispatchToProps: MapDispatchType = {
  deleteTodo: deleteTodoSagaAction,
  setDeleteTodoId: setDeleteTodoIdAction,
};

export const ConnectedDeleteTodoModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteTodoModalWrapper);
