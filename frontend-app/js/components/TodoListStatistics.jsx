import React from 'react';

import { removeTodoListCompletedItems, completeTodoListItems } from '../actions/TodoApplicationActions';

class TodoListStatistics extends React.Component {

  constructor() {
    super();
    this.removeTodoListCompletedItems = this.removeTodoListCompletedItems.bind(this);
    this.completeTodoListItems = this.completeTodoListItems.bind(this);
  }

  // Delete all completed todo list items.
  removeTodoListCompletedItems() {
    removeTodoListCompletedItems();
  }

  // Set all todo items completed.
  completeTodoListItems() {
    completeTodoListItems();
  }

  render() {
    const todoListItems = this.props.value;
    const total = todoListItems.length;
    let completed = 0;
    let itemsLeftTodo = 0;

    todoListItems.map(item => {
      if (item.completed) {
        completed++;
      }
      return item;
    });

    itemsLeftTodo = total - completed;

    return (
      <footer className="task-footer">
        <ul className="list-inline clearfix">
          <li className="first-item">
            <span className="clear-completed" onClick={() => this.removeTodoListCompletedItems()}>Clear completed ({completed})</span>
          </li>
          <li className="text-center">
            <span>
              <strong>{itemsLeftTodo}</strong>
              <span className="text-muted">items left</span>
            </span>
          </li>
          <li className="text-right">
            <span style={{ cursor: 'pointer' }} onClick={() => this.completeTodoListItems()}>Mark all as done</span>
          </li>
        </ul>
      </footer>
    );
  }
}

// Validating props
TodoListStatistics.propTypes = {
  value: React.PropTypes.array.isRequired,
};

export default TodoListStatistics;
