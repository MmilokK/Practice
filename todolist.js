var todo = {
    action(e) {
        const target = e.target;
        if (target.classList.contains('todo__action')) {
          const action = target.dataset.todoAction;
          const elemItem = target.closest('.todo__item');
          if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
            elemItem.remove();
          } else {
            elemItem.dataset.todoState = action;
          }
          this.save();
        } else if (target.classList.contains('todo__add')) {
          this.add();
          this.save();
        }
      },
    add() {
        const elemText = document.querySelector('.todo__text');
        if (elemText.disabled || !elemText.value.length) {
          return;
        }
        document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value));
        elemText.value = '';
      },
      create(text) {
        return `<li class="todo__item" data-todo-state="active">
          <div class="todo__task">${text}</div>
          <span class="todo__action todo__action_restore" data-todo-action="active"></span>
          <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
          <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
      },
      init() {
        const fromStorage = localStorage.getItem('todo');
        if (fromStorage) {
          document.querySelector('.todo__items').innerHTML = fromStorage;
        }
        document.querySelector('.todo__options').addEventListener('change', this.update);
        document.addEventListener('click', this.action.bind(this));
      },
    update() {
        let elem = document.querySelector(".todo__options");
        let option = elem.value;
      
        if(option === 'deleted'){
        elem.style.backgroundColor = '#c93232';
        
        }
        else if(option === 'completed'){
        elem.style.backgroundColor = '#e58020';
        }
        else {
            elem.style.backgroundColor = '#42b840';
        }
        document.querySelector(".todo__items").dataset.todoOption = option;
        document.querySelector(".todo__text").disabled = option !== "active";
      
    },
    save() {
        localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
    }
};

todo.init();

  