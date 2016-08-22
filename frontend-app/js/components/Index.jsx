import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import todoApp from '../reducers';
import TodoApplication from '../containers/TodoApplication';

let store = createStore(todoApp);

render(
	<Provider store={store}>
		<TodoApplication />
	</Provider>, 
	document.getElementById('application')
);
