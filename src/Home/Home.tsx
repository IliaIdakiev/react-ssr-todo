import * as  React from 'react';
import { connect } from 'react-redux';
import { loadItems } from '@actions/test';

console.log(loadItems.toString());

const mapStateToProps = (state: any) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetch: () => {
      dispatch({ type: 'FETCH', payload: '' });
    }
  }
}

class Home extends React.Component<any, any> {

  render() {
    return <h1>{this.props.counter}</h1>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);