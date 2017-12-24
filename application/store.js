class Store {
  constructor(state, reducer) {
    this._state = state;
    this._reducer = reducer;
    this._listeners = [];
  }
  getState() {
    return JSON.parse(JSON.stringify(this._state));
  }
  dispatch(action) {
    this._state = this._reducer(this._state, action);
    this._change();
  }
  addChangeListener(listener) {
    this._listeners.push(listener);
  }
  _change() {
    this._listeners.forEach(listener => {
      listener();
    });
  }
}

const initialState = {
  tasks: [{
    id: 0,
    text: 'Item 1',
    completed: false,
  }, {
    id: 1,
    text: 'Item 2',
    completed: false,
  }],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_TASK': {
      state.tasks.push(Object.assign({}, {
        id: state.tasks.length,
        text: '',
        completed: false,
      }, action.task));
      break;
    }
    case 'UPDATE_TASK': {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign({}, task, action.task);
        } else {
          return task;
        }
      });
      break;
    }
    case 'DELETE_TASK': {
      state.tasks = state.tasks.filter((task) => {
        return action.task.id !== task.id;
      });
      break;
    }
  }
  return state;
};
