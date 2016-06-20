import axios from 'axios';

import Dispatcher from '../dispatcher/TodoApplicationDispatcher';
import { TodoApplicationConstants } from '../constants/TodoApplicationConstants';

// Get all todo list items.
export function fetchTodoListItems() {
  axios.get(['http://localhost:3001', 'todo'].join('/')).then(({ data }) => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.FETCH_ITEMS,
      data,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}

// Create a new todo list item.
export function addNewTodoListItem(item) {
  axios.post(['http://localhost:3001', 'todo'].join('/'), item).then(({ data }) => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.ADD_ITEM,
      data,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}

// Update the todo list item.
export function updateTodoListItem(item) {
  axios.put(['http://localhost:3001', 'todo', item._id].join('/'), item).then(() => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.UPDATE_ITEM,
      data: item,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}

// Toggle complete the todo list item.
export function toggleTodoListItemComplete(item) {
  axios.put(['http://localhost:3001', 'todo', item._id].join('/'), item).then(() => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.TOGGLE_ITEM_COMPLETE,
      data: item,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}

// Delete the todo list item.
export function removeTodoListItem(item) {
  axios.delete(['http://localhost:3001', 'todo', item._id].join('/')).then(() => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.REMOVE_ITEM,
      data: item,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}

// Delete all completed todo list items.
export function removeTodoListCompletedItems() {
  axios.delete(['http://localhost:3001', 'todo'].join('/'), {
    params: {
      completed: true,
    },
  }).then(() => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.REMOVE_COMPLETED_ITEMS,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}

// Set all todo items completed.
export function completeTodoListItems() {
  axios.put(['http://localhost:3001', 'todo'].join('/'), {}, {
    params: {
      completed: true,
    },
  }).then(() => {
    Dispatcher.dispatch({
      actionType: TodoApplicationConstants.COMPLETE_ALL_ITEMS,
    });
  }).catch(err => {
    console.log('Server comunication error', err);
  });
}
