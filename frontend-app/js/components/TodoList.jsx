import React, { PropTypes } from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <TodoListItem key={todo.id} value={todo} 
      />
    )}
  </ul>
)

// Validating props
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
};

export default TodoList;
