"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => {
            dispatch({ type: 'FETCH', payload: '' });
        }
    };
};
class Home extends React.Component {
    componentWillMount() {
        this.props.fetch();
    }
    render() {
        return React.createElement("h1", null, this.props.counter);
    }
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Home);
//# sourceMappingURL=Home.js.map