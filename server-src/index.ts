const moduleAlias: any = require('module-alias');

import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

moduleAlias.addAlias('@actions', path.resolve('./dist-server/server-src/actions/'));

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import buildReactHtml from '../src/index-server';
import api from './api';

import { reducer } from '../src/reducers';
import { pathResolvers } from './resolvers';

const mainDirPath = process.cwd();
const distPath = path.join(mainDirPath, 'dist');

const bundles = fs.readdirSync(distPath).reduce((acc, bundle) => {
  const [name, type] = /^.*\.(js|css)$/.exec(bundle) || [null, null];
  if (name === null) return acc;
  return acc.concat(type === 'js' ? `<script defer src="${name}"></script>` : `<link href="${name}" rel="stylesheet"/>`);
}, []);

function renderIndex(html: string, store: any) {
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

app.use('/api', api);

app.get('*', (req, res) => {
  const url = req.url;
  const store = createStore(reducer, undefined, applyMiddleware(thunk));

  Promise.all((pathResolvers[url] || []).map((a: any) => a())).then(data => {
    data.map((action: any) => store.dispatch(action));
    const reactAppHtml = buildReactHtml({ url, store });
    res.send(renderIndex(reactAppHtml, store));
  })
});

app.listen(3000, () => console.log('App listening on 3000'));
