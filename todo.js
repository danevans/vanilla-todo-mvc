function createButton(text, clickHandler) {
  const button = document.createElement('button');
  button.appendChild(document.createTextNode(text));
  button.addEventListener('click', clickHandler);
  return button;
}

function activeCount() {
  return list.getElementsByClassName('todo').length - list.getElementsByClassName('done').length
}

function render() {
  if (counter.firstChild) {
    counter.removeChild(counter.firstChild);
  }
  counter.appendChild(document.createTextNode(`${activeCount()} items left`));
  clearCompleted.setAttribute('class', list.getElementsByClassName('done').length ? '' : 'hide');
  toggleButton.setAttribute('class', list.getElementsByClassName('todo').length ? '' : 'hide');
}

function onEnter(node, fn) {
  node.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      fn(event);
    }
  });
}

function createTodo(title) {
  const todo = document.createElement('li');
  todo.setAttribute('class', 'todo');
  const text = document.createElement('span');
  text.appendChild(document.createTextNode(title));
  text.setAttribute('class', 'title');
  text.addEventListener('blur', function() {
    text.contentEditable = "false";
    if (text.textContent.trim() === '') {
      todo.parentNode.removeChild(todo);
      render();
    }
  });
  onEnter(text, function() {
    text.blur();
  });
  todo.appendChild(text);

  const done = createButton('Done', function(event) {
    todo.setAttribute('class', 'todo done');
    render();
  });
  done.setAttribute('class', 'done-button');

  const undo = createButton('Undo', function(event) {
    todo.setAttribute('class', 'todo');
    render();
  });
  undo.setAttribute('class', 'undo-button');

  const remove = createButton('Delete', function() {
    todo.parentNode.removeChild(todo);
    render();
  });

  text.addEventListener('dblclick', function() {
    text.contentEditable = "true";
    text.focus();
  });

  todo.appendChild(done);
  todo.appendChild(undo);
  todo.appendChild(remove);
  return todo;
}

function addTodo(list, input) {
  if (input.value.trim() !== '') {
    list.appendChild(createTodo(input.value));
    input.value = '';
    render();
  }
}

const rootNode = document.getElementById('app');

const list = document.createElement('ul');

const counter = document.createElement('span');
counter.setAttribute('class', 'counter');

const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Get the milk');
onEnter(input, function() {
  addTodo(list, input);
});

const addButton = createButton('Create TODO', function() {
  addTodo(list, input);
});

const toggleButton = createButton('Toggle', function() {
  const finish = activeCount();
  for (let todo of document.getElementsByClassName('todo')) {
    todo.setAttribute('class', finish ? 'todo done' : 'todo');
  }
  render();
});

function toggleFilter(filterClass) {
  return function(event) {
    list.setAttribute('class', filterClass);
    document.getElementsByClassName('active')[0].setAttribute('class', '');
    event.target.setAttribute('class', 'active');
  };
}

const allButton = createButton('All', toggleFilter(''));
allButton.setAttribute('class', 'active');
const doneButton = createButton('Done', toggleFilter('filter-done'));
const activeButton = createButton('Active', toggleFilter('filter-active'));

const clearCompleted = createButton('Clear Completed', function() {
  const doneItems = list.getElementsByClassName('done');
  let todo = doneItems.item(0);
  while (todo) {
    todo.parentNode.removeChild(todo);
    todo = doneItems.item(0);
  }
});

render();

rootNode.appendChild(toggleButton);
rootNode.appendChild(input);
rootNode.appendChild(addButton);
rootNode.appendChild(list);
rootNode.appendChild(counter);
rootNode.appendChild(allButton);
rootNode.appendChild(doneButton);
rootNode.appendChild(activeButton);
rootNode.appendChild(clearCompleted);
