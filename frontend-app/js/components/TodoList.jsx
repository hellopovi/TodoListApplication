import React from 'react';
import classNames from 'classnames';

import TodoListItem from './TodoListItem';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayMode: 'ALL',
    };

    this.showActiveTodoItems = this.showActiveTodoItems.bind(this);
    this.showCompletedTodoItems = this.showCompletedTodoItems.bind(this);
    this.changeDisplayMode = this.changeDisplayMode.bind(this);
    this.checkActiveFilterTab = this.checkActiveFilterTab.bind(this);
  }

  // Toggle view / edit modes.
  changeDisplayMode(displayMode) {
    this.setState({
      displayMode,
    });
  }

  // Find which filter is active.
  checkActiveFilterTab(clickedFilterTab) {
    if (clickedFilterTab === this.state.displayMode) {
      return true;
    }
    return false;
  }

  // Generate list of completed tasks.
  showCompletedTodoItems(allTodoListItems) {
    const completedItems = allTodoListItems.filter(item => {
      if (item.completed) {
        return true;
      }
      return false;
    });
    return completedItems;
  }

  // Generate list of active tasks.
  showActiveTodoItems(allTodoListItems) {
    const activeItems = allTodoListItems.filter(item => {
      if (!item.completed) {
        return true;
      }
      return false;
    });
    return activeItems;
  }

  render() {
    const allTodoListItems = this.props.value || [];
    let displayTodoListItems = [];

    // Setting different types of item lists.
    switch (this.state.displayMode) {

      case 'ALL':
        displayTodoListItems = allTodoListItems;
        break;

      case 'ACTIVE':
        displayTodoListItems = this.showActiveTodoItems(allTodoListItems);
        break;

      case 'COMPLETED':
        displayTodoListItems = this.showCompletedTodoItems(allTodoListItems);
        break;

      default:

    }

    // Setting active class on filter tabs.
    let allFilterTabClass = classNames({
      active: this.checkActiveFilterTab('ALL'),
    });

    let activeFilterTabClass = classNames({
      active: this.checkActiveFilterTab('ACTIVE'),
    });

    let completedFilterTabClass = classNames({
      active: this.checkActiveFilterTab('COMPLETED'),
    });

    let todoListItems;
    if (displayTodoListItems.length > 0) {
      todoListItems = displayTodoListItems.map((todoListItem) => {
        return (
          <TodoListItem key={todoListItem._id} value={todoListItem} />
        );
      });
    }

    return (
      <div>
        <section>
          <ul className="filters list-inline nav nav-tabs">
            <li className={allFilterTabClass}>
              <a onClick={() => this.changeDisplayMode('ALL')}>All</a>
            </li>
            <li className={activeFilterTabClass}>
              <a onClick={() => this.changeDisplayMode('ACTIVE')}>Active</a>
            </li>
            <li className={completedFilterTabClass}>
              <a onClick={() => this.changeDisplayMode('COMPLETED')}>Completed</a>
            </li>
          </ul>
        </section>
        <ul className="task-list list-unstyled">
          {todoListItems}
        </ul>
      </div>
    );
  }
}

// Validating props
TodoList.propTypes = {
  value: React.PropTypes.array.isRequired,
};

export default TodoList;
