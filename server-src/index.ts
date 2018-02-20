import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { matchPath } from 'react-router-dom';

import buildReactHtml from '../src/index-server';
import api from './api';

import { reducer } from '../src/reducers';
import { pathResolvers } from './resolvers';
import { routes, paths } from '../src/routes';
import { AppState } from '../src/interfaces/app-state';
import { Store } from 'redux';

const mainDirPath = process.cwd();
const distPath = path.join(mainDirPath, 'dist');

const bundles = fs.readdirSync(distPath).reduce((acc, bundle) => {
  const [name, type] = /^.*\.(js|css)$/.exec(bundle) || [null, null];
  if (name === null) return acc;
  return acc.concat(type === 'js' ? `<script defer src="/${name}"></script>` : `<link href="/${name}" rel="stylesheet"/>`);
}, []);

function renderIndex(html: string, store: Store<AppState>, withSW = true) {
  const state = store.getState();
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        ${bundles.join('\n')}
        ${withSW ? `<script>
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
              console.log('Service worker registration succeeded:', registration);
            }).catch(function(error) {
              console.log('Service worker registration failed:', error);
            });
          } else {
            console.log('Service workers are not supported.');
          }
        </script>` : ''}
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `;
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(distPath));
app.use('/img', express.static('./public'));

app.get('/sw.js', (req, res) => {
  res.sendFile(path.resolve('./sw.js'));
});

app.get('/app-shell', (req, res) => {
  const store = createStore<AppState>(reducer, undefined, applyMiddleware(thunk));
  const reactAppShellHtml = buildReactHtml({ url: '/', store }, true);
  res.send(renderIndex(reactAppShellHtml, store, false));
});

app.get('/idb.js', (req, res) => {
  res.sendFile(path.resolve('./node_modules/idb/lib/idb.js'));
});

app.use('/api', api);

app.get('**', (req, res) => {
  const url = req.url;

  const matches: any[] = routes.reduce((acc, route) => {
    const match = matchPath(url, route);
    if (!match) return acc;
    return acc.concat(match);
  }, []);

  const { path: matchedPath, params: matchedParams } = matches[0];

  const store = createStore<AppState>(reducer, undefined, applyMiddleware(thunk));

  Promise.all((pathResolvers[matchedPath] || []).map((r: any) => r(matchedParams))).then(data => {
    data.map((action: any) => store.dispatch(action));
    const reactAppHtml = buildReactHtml({ url, store });
    res.send(renderIndex(reactAppHtml, store));
  })

});

app.listen(3000, () => console.log('App listening on 3000'));
