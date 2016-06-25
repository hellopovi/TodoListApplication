jest.unmock('../TodoListStore');
jest.unmock('../../constants/TodoApplicationConstants');

import TodoApplicationDispatcher from '../../dispatcher/TodoApplicationDispatcher';
import { TodoApplicationConstants } from '../../constants/TodoApplicationConstants';
import TodoListStore from '../TodoListStore';

describe('TodoListStore', () => {

  let callback = TodoApplicationDispatcher.register.mock.calls[0][0];
  let item = {
    _id: '007',
    itemData: 'Wash dishes',
    completed: false,
  };

  // Mocked actions.
  let actionTodoCreate = {
    actionType: TodoApplicationConstants.ADD_ITEM,
    data: item,
  };

  let actionTodoRemove = {
    actionType: TodoApplicationConstants.REMOVE_ITEM,
    data: item
  };

  // Test cases.
  it('registers a callback with the dispatcher', () => {
    expect(TodoApplicationDispatcher.register.mock.calls.length).toBe(1);
  });

  it('returns an empty array of items', () => {
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems).toEqual([]);
  });

  it('adds an item to the list', () => {
    callback(actionTodoCreate);
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems.length).toBe(1);
    expect(allItems[0]).toEqual(item);
  });

  it('removes an item from the list', () => {
    callback(actionTodoCreate);
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems.length).toBe(2);
    callback(actionTodoRemove);
    allItems = TodoListStore.getTodoListItems();
    expect(allItems.length).toBe(1);
  });

});