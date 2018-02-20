import * as React from 'React';
import * as ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import AppShell from './AppShell';

export interface RenderProps {
  url: string;
  store: any;
  context?: any;
}

export default function renderRact(config: RenderProps, isShell = false) {

  if (!isShell) return ReactDomServer.renderToString(
    <StaticRouter location={config.url} context={config.context || {}}>
      <Provider store={config.store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  return ReactDomServer.renderToString(
    <StaticRouter location={config.url} context={config.context || {}}>
      <Provider store={config.store}>
        <AppShell />
      </Provider>
    </StaticRouter>
  );;
};