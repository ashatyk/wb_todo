import React from 'react';
import { RouteNode } from '@wildberries/service-router';
import {
  ReduxStoreLoader,
} from '@mihanizm56/redux-core-modules';
import { storeInjectConfig } from './store-inject-config';
import {IAction} from "@wildberries/service-router";

const pageNode = 'todo';

const action: IAction = async ({ fromState, toState }) => {
  return {
    title: 'Todo',
    content: (
      <ReduxStoreLoader
        fromState={fromState}
        storeInjectConfig={storeInjectConfig}
        toState={toState}
      >
        <RouteNode nodeName={pageNode}>{() => <></>}</RouteNode>
      </ReduxStoreLoader>
    ),
  };
};

export default action;
