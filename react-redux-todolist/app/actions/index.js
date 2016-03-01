let nextTodoId = 0;
export
const addToDo = (text) => {
	return {
		type: 'AddToDo',
		id: nextToDoId++,
		text
	}
}

export
const setVisibilityFilter = (filter) => {
	return {
		type: 'SetVisibilityFilter',
		filter
	}
}

export
const toggleToDo = (id) => {
	return {
		type: 'ToggleToDo',
		id
	}
}