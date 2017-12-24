class LitterNodeList {
  constructor(elements) {
    this._elements = elements;
    this.length = this._elements.length;
  }
  els() {
    return this._elements;
  }
  each(callback) {
    this._wrapArray(this._elements).forEach((element, index) => {
      callback(new LitterElement(element), index);
    });
  }
  _wrapArray(elements) {
    return Array.prototype.slice.call(elements);
  }
}

class LitterElement {
  constructor(element) {
    this._element = element;
  }
  el() {
    return this._element;
  }
  // Selector
  find(selector) {
    const element = this._element.querySelector(selector);
    return new LitterElement(element);
  }
  findAll(selector) {
    const elements = this._element.querySelectorAll(selector);
    return new LitterNodeList(elements);
  }
  // Event Handler
  on(eventType, handler) {
    this._element.addEventListener(eventType, handler);
  }
  // DOM Manipulater
  empty() {
    this._element.innerHTML = '';
  }
  append(view) {
    this._element.appendChild(view.$el().el());
  }
  remove() {
    this._element.parentNode.removeChild(this._element);
  }
  // Class Handling
  hasClass(className) {
    if (this._element.classList) {
      return this._element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(this._element.className);
    }
  }
  addClass(className) {
    if (this._element.classList) {
      this._element.classList.add(className);
    } else {
      this._element.className += ' ' + className;
    }
  }
  removeClass(className) {
    if (this._element.classList) {
      this._element.classList.remove(className);
    } else {
      this._element.className = this._element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  // aliases - Event Handler
  // aliases - DOM Manipulater
  replace(element) {
    this.empty();
    if (element.length !== undefined) {
      element.forEach((element_) => {
        this.append(element_);
      });
    } else {
      this.append(element);
    }
  }
  // aliases - Class Handling
}

class LitterView {
  constructor(element, props = {}) {
    this.props = props;

    this._el = (element === null && this.template) ? template2dom(this.template()) : element;
    this._$el = new LitterElement(this._el);

    if (this.render) {
      this.render();
    }

    if (this.setEventListeners) {
      this.setEventListeners();
    }
  }
  $el() {
    return this._$el;
  }
}

function template2dom(string) {
  const parser = new DOMParser()
  const document = parser.parseFromString(string, 'text/html');
  return document.body.firstChild;
}

const Litter = {
  View: LitterView,
};
