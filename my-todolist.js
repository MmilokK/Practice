let myTodo = {
    start() {
        let todoStorage = localStorage.getItem('my-todo');
        if (todoStorage){
            document.querySelector('ul').innerHTML = todoStorage;
        }
        document.querySelector(".options").addEventListener('change', this.change);
        document.addEventListener("click", this.action.bind(this));
    },
    add() {
        let input = document.querySelector("input");
        let taskText = input.value;

        if(!taskText.length){
            return;
        }
        document.querySelector('ul').insertAdjacentHTML('beforeend', this.create(taskText));
        input.value = '';
    },
    create(text){
        return `
        <li class = 'task' data-state = 'active'>
        <div class = 'container'>${text}</div>
        <span class = 'action action-active' data-action = 'active'></span>
        <span class = 'action action-completed' data-action = 'completed'></span>
        <span class = 'action action-deleted' data-action = 'deleted'></span> </li>
        `;
    },
    change() {
        let optionItem = document.querySelector(".options");
        let option = optionItem.value;
        if(option === 'deleted'){
            optionItem.style.backgroundColor = '#c93232';
            
        }
        else if(option === 'completed'){
            optionItem.style.backgroundColor = '#e58020';
        }
        else {
            optionItem.style.backgroundColor = '#42b840';
        }
        document.querySelector(".output-tasks").dataset.option = option;
        document.querySelector("input").disabled = option !== "active";
    },
    action(event){
        const target = event.target;
        if(target.classList.contains('action')){
            const action = target.dataset.action;
            const task = target.closest('.task');
            if(action === "deleted" && task.dataset.state === "deleted"){
                task.remove();
            } else {
            task.dataset.state = action;
            }
            this.save();
        } else if(target.classList.contains("add-task")) {
            this.add();
            this.save();
        }
        
    },
    save(){
        localStorage.setItem('my-todo', document.querySelector('ul').innerHTML);
        
    }

}
myTodo.start();