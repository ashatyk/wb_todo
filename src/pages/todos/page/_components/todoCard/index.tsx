import classnames from 'classnames/bind';
import React from 'react';
import {
  ButtonLink,
  Checkbox,
  Text,
} from '@wildberries/ui-kit';
import styles from './index.module.scss';
import { ITodo } from '@/_redux/todo-slice';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'TodoCard';

export type TodoCardPropsType = ITodo & {
  onDeleteTodoClick?: (id: ITodo['id']) => void;
  onUpdateTodoClick?: (id: ITodo['id']) => void;
  updateTodo: (todo: ITodo) => void;
}

export const TodoCard = ({
  onUpdateTodoClick,
  onDeleteTodoClick,
  updateTodo,
  ...todoProps
}: TodoCardPropsType) => {
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
            text={`created at: ${todoProps.createdAt}`}
          />
        </div>
      </div>
      <div className={cn(`${BLOCK_NAME}__controls`)}>
        <ButtonLink onClick={handleUpdateClick} text="Update" variant="accent" />
        <ButtonLink onClick={handleDeleteClick} text="Delete" variant="accent" />
      </div>
    </div>
  );
};
