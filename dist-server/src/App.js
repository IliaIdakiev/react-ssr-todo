"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = require("./Home/Home");
const About_1 = require("./About/About");
const NotFound_1 = require("./NotFound");
class App extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("nav", null,
                React.createElement(react_router_dom_1.Link, { to: "/" }, "Home"),
                React.createElement(react_router_dom_1.Link, { to: "/about" }, "About")),
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/", component: Home_1.default, exact: true }),
                React.createElement(react_router_dom_1.Route, { path: "/about", component: About_1.default }),
                React.createElement(react_router_dom_1.Route, { component: NotFound_1.default }))));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map