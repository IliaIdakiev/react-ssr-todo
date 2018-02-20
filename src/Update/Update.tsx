import * as React from 'react';

import { connect, Dispatch } from 'react-redux';

import './Update.css';
import { AppState } from '../interfaces/app-state';
import { bindActionCreators } from 'redux';
import { saveTodo, fetchTodo } from '../actions/async';
import { Todo } from '../interfaces/todo';

const mapStateToProps = (state: AppState) => ({
  todo: state.selectedTodo
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  saveTodo,
  fetchTodo
}, dispatch);

// interface UpdateProps {
//   todo: Todo;
//   saveTodo: (todo: Todo) => void;
//   fetchTodo: (force: boolean, id: string) => void;
// }

class Update extends React.Component<any, any> {

  componentDidMount() {
    this.props.fetchTodo(false, (this.props as any).match.params.id);
  }

  render() {
    return (
      <div>
        <h1>Update</h1>
        {this.props.todo.text}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update);