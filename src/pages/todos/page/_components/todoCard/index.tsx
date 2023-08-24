import classnames from 'classnames/bind';
import React from 'react';
import { ButtonLink, Checkbox, Text } from '@wildberries/ui-kit';
import i18next from 'i18next';
import { ITodo } from '@/_redux/todo-slice';
import { TODO_PAGE_TRANSLATES } from '@/pages/todos/page/_constants/translations';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'TodoCard';

type PropsType = ITodo & {
  onDeleteTodoClick?: (id: ITodo['id']) => void;
  onUpdateTodoClick?: (id: ITodo['id']) => void;
  updateTodo: (todo: ITodo) => void;
};

export const TodoCard = ({
  onUpdateTodoClick,
  onDeleteTodoClick,
  updateTodo,
  ...todoProps
}: PropsType) => {
  const handleUpdateClick = () => {
    onUpdateTodoClick(todoProps.id);
  };
  const handleCompletedChange = () => {
    updateTodo({ ...todoProps, completed: !todoProps.completed });
  };
  const handleDeleteClick = () => {
    onDeleteTodoClick(todoProps.id);
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__toggle`)}>
        <Checkbox
          checked={todoProps.completed}
          id={todoProps.id}
          name="content"
          onChange={handleCompletedChange}
          toggle
        />
      </div>
      <div className={cn(`${BLOCK_NAME}__content`)}>
        <div className={cn(`${BLOCK_NAME}__truncate`)}>
          <Text color="black" isUpperCase size="h2" text={todoProps.title} />
        </div>
        <div className={cn(`${BLOCK_NAME}__truncate`)}>
          <Text
            color="black"
            isUpperCase
            size="h5-bold"
            text={`${i18next.t(TODO_PAGE_TRANSLATES.createdAt)}: ${
              todoProps.createdAt
            }`}
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
};
