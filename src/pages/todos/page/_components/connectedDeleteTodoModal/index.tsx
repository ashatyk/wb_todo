import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { ButtonVariant, Modal } from '@wildberries/ui-kit';
import i18next from 'i18next';
import {
  deleteTodoSagaAction,
  ETodosLoadings,
  TodoStorageSliceType,
  deleteTodoIdSelector,
  isDeleteTodoModalOpenSelector,
  todosLoadingSelector,
  setDeleteTodoIdAction,
} from '@/_redux/todo-slice';
import { TODO_PAGE_TRANSLATES } from '@/pages/todos/page/_constants/translations';

type MapStateOutputType = {
  deleteTodoId: ReturnType<typeof deleteTodoIdSelector>;
  isDeleteTodoModalOpen: ReturnType<typeof isDeleteTodoModalOpenSelector>;
  isLoading: ReturnType<typeof todosLoadingSelector>;
};

type MapDispatchType = {
  deleteTodo: typeof deleteTodoSagaAction;
  setDeleteTodoId: typeof setDeleteTodoIdAction;
};

type PropsType = MapStateOutputType & MapDispatchType;
export const WrappedComponent = ({
  deleteTodoId,
  isLoading,
  isDeleteTodoModalOpen,
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
        title: i18next.t(TODO_PAGE_TRANSLATES.deleteButton),
        isLoading,
        disabled: isLoading,
      },
      cancelButton: {
        onClick: handleDeleteTodoModalCloseClick,
        variant: 'adaptive' as ButtonVariant,
        title: i18next.t(TODO_PAGE_TRANSLATES.closeButton),
      },
    }),
    [isLoading, handleDeleteTodoClick, handleDeleteTodoModalCloseClick],
  );

  const todoDeleteTitle = useMemo(
    () => (deleteTodoId ? deleteTodoId.slice(0, 10) : ''),
    [deleteTodoId],
  );

  return (
    <Modal
      actionsConfig={actionsConfig}
      isOpened={isDeleteTodoModalOpen}
      isShowCloseIcon
      onClose={handleDeleteTodoModalCloseClick}
      title={`${i18next.t(TODO_PAGE_TRANSLATES.deleteTodo)} ${todoDeleteTitle}`}
    />
  );
};

const mapStateToProps = (state: TodoStorageSliceType): MapStateOutputType => ({
  isLoading: todosLoadingSelector(state, ETodosLoadings.DELETE_TODO),
  isDeleteTodoModalOpen: isDeleteTodoModalOpenSelector(state),
  deleteTodoId: deleteTodoIdSelector(state),
});

const mapDispatchToProps: MapDispatchType = {
  deleteTodo: deleteTodoSagaAction,
  setDeleteTodoId: setDeleteTodoIdAction,
};

export const ConnectedDeleteTodoModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedComponent);
