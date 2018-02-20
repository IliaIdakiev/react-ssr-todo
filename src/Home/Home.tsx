import * as  React from 'react';

import './Home.css';

import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { fetchTodos, saveTodo } from '../actions/async';

import { AppState } from '../interfaces/app-state';
import { Todo } from '../interfaces/todo';

const mapStateToProps = (state: AppState) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  fetchTodos,
  saveTodo
}, dispatch);

interface HomeProps {
  todos: Todo[];
  fetchTodos: (force?: boolean) => any;
  saveTodo: (todo: Todo) => any;
}

class Home extends React.Component<HomeProps, any> {

  componentDidMount() {
    this.props.fetchTodos();
  }

  completedHandler = (event: any) => {
    const id = event.target.getAttribute('data-id');
    const todo = this.props.todos.find(todo => todo.id === +id);
    todo.completed = !todo.completed;
    this.props.saveTodo(todo);
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