import React from 'react';
import classNames from 'classnames';

import TodoListItemInput from './TodoListItemInput';

class TodoListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateTodoListItem = this.updateTodoListItem.bind(this);
    this.toggleTodoListItemComplete = this.toggleTodoListItemComplete.bind(this);
    this.removeTodoListItem = this.removeTodoListItem.bind(this);
  }

  // Toggle view modes.
  toggleEditMode() {
    this.setState({
      editMode: true,
    });
  }

  // Change status of item.
  toggleTodoListItemComplete() {
    const item = this.props.value;
    item.completed = !item.completed;
    toggleTodoListItemComplete(item);
  }

  // Update item information.
  updateTodoListItem(itemData) {
    updateTodoListItem({
      _id: this.props.value._id,
      itemData,
      completed: this.props.value.completed,
    });
    this.setState({
      editMode: false,
    });
  }

  // Remove item.
  removeTodoListItem() {
    const item = this.props.value;
    removeTodoListItem(item);
  }

  render() {
    const editMode = this.state.editMode;
    let editItem;
    let itemCompletedClass = classNames({
      'completed': this.props.value.completed,
    });
    let itemInvisibleClass = classNames({
      'view': true,
      'hidden': this.state.editMode,
    });

    if (editMode) {
      editItem = <TodoListItemInput value={this.props.value.itemData} onSave={this.updateTodoListItem} />;
    }

    return (
      <li className={itemCompletedClass}>
        <span className={itemInvisibleClass}>
          <input
            type="checkbox"
            className="toggle-task"
            checked={this.props.value.completed}
            onChange={this.toggleTodoListItemComplete}
          />
          <label onDoubleClick={this.toggleEditMode}>{this.props.value.itemData}</label>
          <span
            className="glyphicon glyphicon-pencil"
            onClick={this.toggleEditMode}
          />
          <span
            className="glyphicon glyphicon-remove"
            onClick={this.removeTodoListItem}
          />
        </span>
        {editItem}
      </li>
    );
  }
}

// Validating props
TodoListItem.propTypes = {
  value: React.PropTypes.object.isRequired,
};

export default TodoListItem;
