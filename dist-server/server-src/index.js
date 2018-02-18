"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const redux_1 = require("redux");
const index_server_1 = require("../src/index-server");
const api_1 = require("./api");
const mainDirPath = process.cwd();
const distPath = path.join(mainDirPath, 'dist');
const bundles = fs.readdirSync(distPath).filter(bundle => /.*\.js$/.test(bundle)).map(bundle => `<script src="${bundle}"></script>`);
function renderIndex(html, store) {
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
app.use('/api', api_1.default);
app.get('*', (req, res) => {
    const store = redux_1.createStore(function reducer(state = { counter: 10 }, action) {
        // if (action.type === 'FETCH') return (dispatch: any) => {
        //   dispatch({ type: 'LOAD', payload: 200 });
        // };
        if (action.type === 'LOAD') {
            console.log('Load', action.payload);
        }
        return state;
    });
    const reactAppHtml = index_server_1.default({ url: req.url, store });
    res.send(renderIndex(reactAppHtml, store));
});
app.listen(3000, () => console.log('App listening on 3000'));
//# sourceMappingURL=index.js.map