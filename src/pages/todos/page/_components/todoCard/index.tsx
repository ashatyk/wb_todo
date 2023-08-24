import classnames from 'classnames/bind';
import React, { memo, useCallback } from 'react';
import { ButtonLink, Checkbox, Text } from '@wildberries/ui-kit';
import i18next from 'i18next';
import { TodoType } from '@/_redux/todo-slice';
import { TODO_PAGE_TRANSLATES } from '@/pages/todos/page/_constants/translations';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'TodoCard';

type PropsType = TodoType & {
  handleDeleteTodoClick?: (id: TodoType['id']) => void;
  handleUpdateTodoClick?: (id: TodoType['id']) => void;
  updateTodo: (todo: TodoType) => void;
};

export const TodoCard = memo(
  ({
    handleDeleteTodoClick,
    handleUpdateTodoClick,
    updateTodo,
    completed,
    createdAt,
    description,
    title,
    id,
  }: PropsType) => {
    const handleUpdateClick = useCallback(() => {
      handleUpdateTodoClick(id);
    }, [handleUpdateTodoClick, id]);

    const handleCompletedChange = useCallback(() => {
      updateTodo({
        id,
        createdAt,
        description,
        title,
        completed: !completed,
      });
    }, [completed, createdAt, description, id, title, updateTodo]);

    const handleDeleteClick = useCallback(() => {
      handleDeleteTodoClick(id);
    }, [handleDeleteTodoClick, id]);

    return (
      <div className={cn(BLOCK_NAME)}>
        <div className={cn(`${BLOCK_NAME}__toggle`)}>
          <Checkbox
            checked={completed}
            id={id}
            name="content"
            onChange={handleCompletedChange}
            toggle
          />
        </div>
        <div className={cn(`${BLOCK_NAME}__content`)}>
          <div className={cn(`${BLOCK_NAME}__truncate`)}>
            <Text color="black" isUpperCase size="h2" text={title} />
          </div>
          <div className={cn(`${BLOCK_NAME}__truncate`)}>
            <Text
              color="black"
              isUpperCase
              size="h5-bold"
              text={`${i18next.t(
                TODO_PAGE_TRANSLATES.createdAt,
              )}: ${createdAt}`}
            />
          </div>
        </div>
        <div className={cn(`${BLOCK_NAME}__controls`)}>
          <ButtonLink
            onClick={handleUpdateClick}
            text="Update"
            variant="accent"
          />
          <ButtonLink
            onClick={handleDeleteClick}
            text="Delete"
            variant="accent"
          />
        </div>
      </div>
    );
  },
);
