import React from 'react';
import classnames from 'classnames/bind';
import { Todos } from '@/pages/todos/page/_components/todoList';
import { ConnectedUpdateTodoModal } from './_components/updateTodoModal';
import styles from './index.module.scss';
import { Header } from './_components/header';
import { ConnectedDeleteTodoModal } from './_components/deleteTodoModal';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'TodoPage';

export const Page = () => (
  <div className={cn(BLOCK_NAME)} data-page="home-page">
    <Header />
    <div className={cn(`${BLOCK_NAME}__content-wrapper`)}>
      <Todos />
    </div>
    <ConnectedUpdateTodoModal />
    <ConnectedDeleteTodoModal />
  </div>
);
