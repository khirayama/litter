class ListItemView extends Litter.View {
  template() {
    return `<li><span class="toggle-button">[DONE]</span> ${this.props.task.text} <span class="delete-button">[DELETE]</span></li>`;
  }

  setEventListeners() {
    this.handleToggleButtonClick = this._handleToggleButtonClick.bind(this);
    this.handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);

    this.$el().find('.toggle-button').on('click', this.handleToggleButtonClick);
    this.$el().find('.delete-button').on('click', this.handleDeleteButtonClick);
  }

  _handleDeleteButtonClick(event) {
    event.stopPropagation();
    this.$el().remove();
  }

  _handleToggleButtonClick(event) {
    event.stopPropagation();
    const className = 'done';
    if (this.$el().hasClass(className)) {
      this.$el().removeClass(className);
    } else {
      this.$el().addClass(className);
    }
  }
}

class ListView extends Litter.View {
  setEventListeners() {
    this.handleAddButtonClick = this._handleAddButtonClick.bind(this);
    this.$el().find('.add-button').on('click', this.handleAddButtonClick);
  }

  _handleAddButtonClick() {
    const num = this.$el().findAll('li').length + 1;
    const listItemView = new ListItemView(null, {
      task: {
        text: `Item ${num}`,
      },
    });
    this.$el().find('ul').append(listItemView);
  }

  render() {
    this.$el().findAll('li').each($li => {
      new ListItemView($li.el());
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}`);
  const el = document.querySelector('.list-view');
  new ListView(el);
});
