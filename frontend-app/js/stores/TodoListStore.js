import EventEmitter from 'events';

import Dispatcher from '../dispatcher/TodoApplicationDispatcher';
import { TodoApplicationConstants } from '../constants/TodoApplicationConstants';

const CHANGE_EVENT = 'change';
let todoListItems = [];

class TodoListStore extends EventEmitter {

  // Register callback on change event
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // Remove change event listener
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  // Set server todo list items.
  fetchItems(items) {
    todoListItems = items;
  }

  // Get all todo list items.
  getTodoListItems() {
    return todoListItems;
  }

  // Add new todo list item.
  addItem(itemData) {
    todoListItems.push(itemData);
  }

  // Update the todo list item.
  updateItem(updatedItem) {
    todoListItems = todoListItems.map(item => {
      if (item._id === updatedItem._id) {
        item.itemData = updatedItem.itemData;
      }
      return item;
    });
  }

  // Remove the todo list item.
  removeItem(removedItem) {
    todoListItems.map((item, index) => {
      if (item._id === removedItem._id) {
        todoListItems.splice(index, 1);
      }
      return item;
    });
  }

  // Remove completed todo list items.
  removeCompletedItems() {
    for (let i = todoListItems.length; i--;) {
      if (todoListItems[i].completed === true) {
        todoListItems.splice(i, 1);
      }
    }
  }

  // Set all todo list items completed.
  completeAllItems() {
    todoListItems = todoListItems.map(item => {
      item.completed = true;
      return item;
    });
  }
}

const TodoListStoreInstance = new TodoListStore();

// Register callbacks for each action.
Dispatcher.register(payload => {
  const action = payload;
  switch (action.actionType) {

    case TodoApplicationConstants.FETCH_ITEMS:
      TodoListStoreInstance.fetchItems(action.data);
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    case TodoApplicationConstants.ADD_ITEM:
      TodoListStoreInstance.addItem(action.data);
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    case TodoApplicationConstants.UPDATE_ITEM:
      TodoListStoreInstance.updateItem(action.data);
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    case TodoApplicationConstants.TOGGLE_ITEM_COMPLETE:
      TodoListStoreInstance.updateItem(action.data);
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    case TodoApplicationConstants.REMOVE_ITEM:
      TodoListStoreInstance.removeItem(action.data);
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    case TodoApplicationConstants.REMOVE_COMPLETED_ITEMS:
      TodoListStoreInstance.removeCompletedItems();
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    case TodoApplicationConstants.COMPLETE_ALL_ITEMS:
      TodoListStoreInstance.completeAllItems();
      TodoListStoreInstance.emit(CHANGE_EVENT);
      break;

    default:

  }
});

export default TodoListStoreInstance;
