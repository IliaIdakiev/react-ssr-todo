import * as React from 'react';

import { connect, Dispatch } from 'react-redux';

import './Update.css';
import { AppState } from '../interfaces/app-state';
import { bindActionCreators } from 'redux';
import { saveTodo, fetchTodo } from '../actions/async';
import { Todo } from '../interfaces/todo';
import { selectTodo, clearLoaded } from '../actions/sync';

const mapStateToProps = (state: AppState) => ({
  todo: state.selectedTodo,
  waiting: state.waiting
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  saveTodo,
  fetchTodo,
  selectTodo,
  clearLoaded
}, dispatch);

class Update extends React.Component<any, any> {

  componentDidMount() {
    const id = (this.props as any).match.params.id;
    if (!id) {
      this.props.clearLoaded(null)
      return;
    };
    this.props.fetchTodo(false, id);
  }

  save = (event: any) => {
    event.preventDefault();

    const updatedTodo = {
      id: (this.refs.id as HTMLInputElement).value,
      text: (this.refs.text as HTMLInputElement).value,
      completed: (this.refs.completed as HTMLInputElement).checked
    }

    this.props.saveTodo(updatedTodo).then(() => this.props.history.push('/'));
  }

  componentWillUnmount() {
    this.props.selectTodo(null);
  }

  render() {
    const isNew = (this.props as any).match.path === '/add';
    const todo = isNew ? { id: -1, text: '', completed: false } : this.props.todo;

    if (!todo) return (<h1>Loading...</h1>);

    return (
      <div>
        <h1>Update</h1>
        <form method="post" action="/api/todos?redirect=/">
          <input type="hidden" defaultValue={todo.id} ref="id" name="id" />
          <div>
            <label>Text</label>
            <input type="text" defaultValue={todo.text} ref="text" name="text" />
          </div>
          <div>
            <label>Completed</label>
            <input type="checkbox" defaultChecked={todo.completed} ref="completed" name="completed" />
          </div>

          {!this.props.waiting ? <button onClick={this.save}>Save</button> : <span>Saving...</span>}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update);