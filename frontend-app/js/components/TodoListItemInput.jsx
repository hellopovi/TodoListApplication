import React from 'react';

const ENTER_KEY_CODE = 13;

class TodoListItemInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemData: this.props.value || '',
    };

    this.inputFieldChanged = this.inputFieldChanged.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.saveTodoListItem = this.saveTodoListItem.bind(this);
  }

  // Text input event handler.
  inputFieldChanged(e) {
    this.setState({
      itemData: e.target.value,
    });
  }

  // Keydown event handler.
  keyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      e.preventDefault();
      this.saveTodoListItem();
    }
  }

  // Invokes the callback passed in as onSave.
  saveTodoListItem() {
    const saveItemCallback = this.props.onSave;
    if (this.state.itemData !== '') {
      saveItemCallback(this.state.itemData);
      this.setState({
        itemData: '',
      });
    }
  }

  render() {
    let todoListItemInputStyle = { marginBottom: '10px' };
    return (
      <span>
        <form
          className="add-task"
          style={todoListItemInputStyle}
        >
          <a
            type="submit"
            className="submit-button"
            onClick={this.saveTodoListItem}
          >
            <span className="glyphicon glyphicon-copy" />
          </a>
          <input
            type="text"
            value={this.state.itemData}
            onChange={this.inputFieldChanged}
            onKeyDown={this.keyDown}
            onBlur={this.saveTodoListItem}
            placeholder="What do you need to do?"
            className="form-control"
            autoFocus
          />
        </form>
      </span>
    );
  }
}

// Validating props
TodoListItemInput.propTypes = {
  value: React.PropTypes.string,
  onSave: React.PropTypes.func.isRequired,
};

export default TodoListItemInput;
