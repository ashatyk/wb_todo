import React from 'react';
import { RouteNode } from '@wildberries/service-router';
import {
  injectAsyncReducer,
  ReduxStoreLoader,
} from '@mihanizm56/redux-core-modules';
import reducerUI, {
  MODULE_REDUCER_NAME as reducerUIName,
} from '@/_redux/ui-module';
import { Page } from './page';
import { storeInjectConfig } from './store-inject-config';

const pageNode = 'todo';

const action = async ({ fromState, toState, router, store }) => {
  injectAsyncReducer({
    store,
    name: reducerUIName,
    reducer: reducerUI,
  });

  return {
    title: 'Todo',
    content: (
      <ReduxStoreLoader
        fromState={fromState}
        storeInjectConfig={storeInjectConfig}
        toState={toState}
      >
        <RouteNode nodeName={pageNode}>
          {({ route }) => {
            if (route.name === pageNode) {
              return <Page />;
            }
          }}
        </RouteNode>
      </ReduxStoreLoader>
    ),
  };
};

export default action;
