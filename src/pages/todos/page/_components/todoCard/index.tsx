import classnames from 'classnames/bind';
import React from 'react';
import {
  ButtonClickEventType,
  ButtonLink,
  Checkbox,
  Text,
} from '@wildberries/ui-kit';
import { CheckboxChangeEventType } from '@wildberries/ui-kit/lib/checkbox/types';
import styles from './index.module.scss';
import { ITodo } from '@/_redux/todo-slice';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'TodoCard';

export interface ITodoCard extends ITodo {
  onDeleteTodoClick?: (id: ITodo['id']) => void;
  onUpdateTodoClick?: (id: ITodo['id']) => void;
  updateTodoSagaAction: (todo: ITodo) => void;
}
export const TodoCard: React.FC<ITodoCard> = ({
  onUpdateTodoClick,
  onDeleteTodoClick,
  updateTodoSagaAction,
  ...todoProps
}) => {
  const onUpdateClick: (event: ButtonClickEventType) => void = () => {
    onUpdateTodoClick(todoProps.id);
  };
  const onCompletedChange: (event: CheckboxChangeEventType) => void = () => {
    updateTodoSagaAction({ ...todoProps, completed: !todoProps.completed });
  };
  const onDeleteClick: (event: ButtonClickEventType) => void = () => {
    onDeleteTodoClick(todoProps.id);
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__toggle`)}>
        <Checkbox
          checked={todoProps.completed}
          id={todoProps.id}
          name="content"
          onChange={onCompletedChange}
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
        <ButtonLink onClick={onUpdateClick} text="Update" variant="accent" />
        <ButtonLink onClick={onDeleteClick} text="Delete" variant="accent" />
      </div>
    </div>
  );
};
