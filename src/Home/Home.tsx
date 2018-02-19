import * as  React from 'react';

import './Home.css';

import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { loadTodosAsync, updateTodoAsync } from '../actions/async';

import { AppState } from '../interfaces/app-state';
import { Todo } from '../interfaces/todo';

const mapStateToProps = (state: AppState) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  loadTodosAsync,
  updateTodoAsync
}, dispatch);

interface HomeComponent {
  todos: Todo[];
  loadTodosAsync: (force?: boolean) => any;
  updateTodoAsync: (todo: Todo) => any;
}

class Home extends React.Component<HomeComponent, any> {

  componentDidMount() {
    this.props.loadTodosAsync();
  }

  completedHandler = (event: any) => {
    const id = event.target.getAttribute('data-id');
    const todo = this.props.todos.find(todo => todo.id === +id);
    todo.completed = !todo.completed;
    this.props.updateTodoAsync(todo);
  };

  render() {
    return (
      <div id="todo-list">
        <h1>Todo List</h1>
        <ul>
          {this.props.todos.map((todo: Todo, index: number) =>
            <li onClick={this.completedHandler} key={index} data-completed={todo.completed} data-id={todo.id}>{todo.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);