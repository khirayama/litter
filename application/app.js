class ListItemView extends Litter.View {
  template() {
    const task = this.props.task;
    return `<li class="${(task.completed) ? 'done' : ''}"><span class="toggle-button">[DONE]</span> ${task.text} <span class="delete-button">[DELETE]</span></li>`;
  }

  setEventListeners() {
    this.handleToggleButtonClick = this._handleToggleButtonClick.bind(this);
    this.handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);

    this.$el().find('.toggle-button').on('click', this.handleToggleButtonClick);
    this.$el().find('.delete-button').on('click', this.handleDeleteButtonClick);
  }

  _handleDeleteButtonClick() {
    this.props.onDeleteButtonClick(this.props);
  }

  _handleToggleButtonClick() {
    this.props.onToggleButtonClick(this.props);
  }
}

class ListView extends Litter.View {
  constructor(el, props) {
    super(el, props);

    this.render();
    this.props.store.addChangeListener(() => {
      this.render();
    });
  }

  setEventListeners() {
    this.handleAddButtonClick = this._handleAddButtonClick.bind(this);
    this.handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this.handleToggleButtonClick = this._handleToggleButtonClick.bind(this);

    this.$el().find('.add-button').on('click', this.handleAddButtonClick);
  }

  _handleAddButtonClick() {
    const {tasks} = this.props.store.getState();
    const dispatch = this.props.store.dispatch.bind(this.props.store);
    this.props.actions.createTask(dispatch, {
      text: `Item ${tasks.length + 1}`,
    });
  }

  _handleDeleteButtonClick(props) {
    const dispatch = this.props.store.dispatch.bind(this.props.store);
    this.props.actions.removeTask(dispatch, {
      id: props.task.id,
    });
  }

  _handleToggleButtonClick(props) {
    const dispatch = this.props.store.dispatch.bind(this.props.store);
    this.props.actions.updateTask(dispatch, {
      id: props.task.id,
      completed: !props.task.completed,
    });
  }

  render() {
    const {tasks} = this.props.store.getState();
    this.$el().find('ul').replace(tasks.map((task) => {
      return new ListItemView(null, {
        task,
        onDeleteButtonClick: this.handleDeleteButtonClick,
        onToggleButtonClick: this.handleToggleButtonClick,
      });
    }));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}`);
  // Get defined Store, initialState and reducer in store.js
  const store = new Store(initialState, reducer);
  const actions = {
    createTask: (dispatch, task) => {
      dispatch({
        type: 'CREATE_TASK',
        task,
      });
    },
    removeTask: (dispatch, task) => {
      dispatch({
        type: 'DELETE_TASK',
        task,
      });
    },
    updateTask: (dispatch, task) => {
      dispatch({
        type: 'UPDATE_TASK',
        task,
      });
    },
  };

  const el = document.querySelector('.list-view');
  new ListView(el, {
    store,
    actions,
  });
});
