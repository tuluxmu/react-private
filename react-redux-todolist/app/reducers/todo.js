const todo = (state, action) => {
	switch (action.type) {
		case 'AddToDo':
			return {
				id: action.id,
				text: action.text,
				compoleted: false
			}
		case 'ToggleToDo':
			state.id !== = action.id ? (
				return state) : ()
			return Object.assign({}, state, {
				completed: !state.completed
			})

	}
}