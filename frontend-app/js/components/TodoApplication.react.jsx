import React from 'react';

import TodoListStore from '../stores/TodoListStore';
import { fetchTodoListItems, addNewTodoListItem } from '../actions/TodoApplicationActions';

import TodoList from './TodoList';
import TodoListItemInput from './TodoListItemInput';
import TodoListStatistics from './TodoListStatistics';

class TodoApplication extends React.Component {

  constructor() {
    super();
    this.state = {
      todoListItems: this.getTodoListItems(),
    };

    this.onChange = this.onChange.bind(this);
    this.addTodoListItem = this.addTodoListItem.bind(this);
    this.getTodoListItems = this.getTodoListItems.bind(this);
  }

  componentDidMount() {
    TodoListStore.addChangeListener(this.onChange);
    fetchTodoListItems();
  }

  componentWillUnmount() {
    TodoListStore.removeChangeListener(this.onChange);
  }

  // Event handler for 'change' events coming from the TodoStore.
  onChange() {
    this.setState({
      todoListItems: this.getTodoListItems(),
    });
  }

  // Retrieve the current TODO items from the TodoListStore.
  getTodoListItems() {
    return TodoListStore.getTodoListItems();
  }

  // Add new todo list item.
  addTodoListItem(itemData) {
    addNewTodoListItem({
      itemData,
      completed: false,
    });
  }

  render() {
    return (
      <section className="task-container">
        <TodoListItemInput onSave={this.addTodoListItem} />
        <TodoList value={this.state.todoListItems} />
        <TodoListStatistics value={this.state.todoListItems} />
      </section>
    );
  }
}

export default TodoApplication;
