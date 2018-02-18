"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("React");
const ReactDomServer = require("react-dom/server");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const App_1 = require("./App");
function renderRact(config) {
    return ReactDomServer.renderToString(React.createElement(react_router_1.StaticRouter, { location: config.url, context: config.context || {} },
        React.createElement(react_redux_1.Provider, { store: config.store },
            React.createElement(App_1.default, null))));
}
exports.default = renderRact;
;
//# sourceMappingURL=index-server.js.map