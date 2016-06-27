jest.unmock('../TodoListStore');
jest.unmock('../../constants/TodoApplicationConstants');

import TodoApplicationDispatcher from '../../dispatcher/TodoApplicationDispatcher';
import { TodoApplicationConstants } from '../../constants/TodoApplicationConstants';
import TodoListStore from '../TodoListStore';

describe('TodoListStore', () => {

  let callback;
  let item = {
    _id: '007',
    itemData: 'Wash dishes',
    completed: false,
  };

  let updatedItem = {
    _id: '007',
    itemData: 'Go to church',
    completed: false,
  };

  let newItem = {
    _id: '008',
    itemData: 'Walk the dog',
    completed: true,
  };

  beforeEach(() => {
    callback = TodoApplicationDispatcher.register.mock.calls[0][0];
  })

  // Mocked actions.
  let actionTodoCreate = {
    actionType: TodoApplicationConstants.ADD_ITEM,
    data: item,
  };

  let actionTodoUpdate = {
    actionType: TodoApplicationConstants.UPDATE_ITEM,
    data: updatedItem
  };

  let actionTodoToggle = {
    actionType: TodoApplicationConstants.TOGGLE_ITEM_COMPLETE,
    data: {_id: '007', completed:true}
  };

  let actionTodoRemove = {
    actionType: TodoApplicationConstants.REMOVE_ITEM,
    data: item
  };

  let actionTodoRemoveCompleted = {
    actionType: TodoApplicationConstants.REMOVE_COMPLETED_ITEMS,
  };

  let actionTodoCompleteAll = {
    actionType: TodoApplicationConstants.COMPLETE_ALL_ITEMS,
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

  it('edits item in the list', () => {
    callback(actionTodoUpdate);
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems[0]).toEqual(updatedItem);
  });

  it('removes an item from the list', () => {
    callback(actionTodoCreate);
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems.length).toBe(2);
    callback(actionTodoRemove);
    allItems = TodoListStore.getTodoListItems();
    expect(allItems.length).toBe(1);
  });

  it('toggles item status in the list', () => {
    callback(actionTodoToggle);
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems[0].completed).toBe(true);
  });

  it('removes all completed items from the list', () => {
    callback(actionTodoRemoveCompleted);
    let allItems = TodoListStore.getTodoListItems();
    expect(allItems.length).toBe(0);
  });

  it('completes all items from the list', () => {
    callback(actionTodoCreate);
    callback(actionTodoCompleteAll);
    let allItems = TodoListStore.getTodoListItems();
    for (let itemInList of allItems) {
      expect(itemInList.completed).toBe(true);
    }
  });

});