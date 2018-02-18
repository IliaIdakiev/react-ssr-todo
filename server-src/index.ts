import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

import { createStore } from 'redux';

import buildReactHtml from '../src/index-server';
import api from './api';

const mainDirPath = process.cwd();
const distPath = path.join(mainDirPath, 'dist');

const bundles = fs.readdirSync(distPath).filter(bundle => /.*\.js$/.test(bundle)).map(bundle => `<script src="${bundle}"></script>`);

function renderIndex(html: string, store: any) {
  const state = store.getState();
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        ${bundles.join('\n')}
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
  const store = createStore(function reducer(state = { counter: 10 }, action: any) {
    // if (action.type === 'FETCH') return (dispatch: any) => {
    //   dispatch({ type: 'LOAD', payload: 200 });
    // };
    if (action.type === 'LOAD') {
      console.log('Load', action.payload);
    }
    return state;
  });
  const reactAppHtml = buildReactHtml({ url: req.url, store });
  res.send(renderIndex(reactAppHtml, store));
});

app.listen(3000, () => console.log('App listening on 3000'));
