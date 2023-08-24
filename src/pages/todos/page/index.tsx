import React from 'react';
import classnames from 'classnames/bind';
import { TodosList } from 'src/pages/todos/page/_components/connectedTodoList';
import { ConnectedUpdateTodoModal } from './_components/connectedUpdateTodoModal';
import styles from './index.module.scss';
import { Header } from './_components/header';
import { ConnectedDeleteTodoModal } from './_components/connectedDeleteTodoModal';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'TodoPage';

export const Page = () => (
  <div className={cn(BLOCK_NAME)} data-page="home-page">
    <Header />
    <div className={cn(`${BLOCK_NAME}__content-wrapper`)}>
      <TodosList />
    </div>
    <ConnectedUpdateTodoModal />
    <ConnectedDeleteTodoModal />
  </div>
);
