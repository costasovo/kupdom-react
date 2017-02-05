let nextTodoId = 0
export const addItem = (text) => {
	return {
		type: 'ADD_ITEM',
		id: nextTodoId++,
		text
	}
}

export const toggleItem = (id) => {
	return {
		type: 'TOGGLE_ITEM',
		id
	}
}
