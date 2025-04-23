const cl=console.log;
const todoForm=document.getElementById('todoForm')
const todoItem=document.getElementById('todoItem')
const addTodo=document.getElementById('addTodo')
const updateTodo=document.getElementById('updateTodo')
const todoContainer=document.getElementById('todoContainer')

let todoArr=localStorage.getItem('todoArr') ? JSON.parse(localStorage.getItem('todoArr')):[]

const generateUuid = ()=>{
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
const ontodoedit = (e) =>{
let editid = e.closest('li').id;
localStorage.setItem('editid',editid)
let editobj = todoArr.find(todo => todo.todoid === editid)
todoItem.value=editobj.todoItem
updateTodo.classList.remove('d-none')
addTodo.classList.add('d-none')
  }
  const onremove =(e)=>{
    let removeid=e.closest('li').id
    let removeindex=todoArr.findIndex(todo=> todo.todoid=removeid)
    todoArr.splice(removeindex,1)
    localStorage.setItem('todoArr',JSON.stringify(todoArr))
    e.closest('li').remove()
  }

  const createtodoList = (arr) =>{
    let result=`<ul class="list-group">`;
    arr.forEach( todo =>{
        result+=`<li class="list-group-item d-flex justify-content-between">${todo.todoid}
        <strong>${todo.todoItem}</strong>
        <div>
                   <button class="btn btn-sm btn-outline-info" onclick="ontodoedit(this)">Edit</button>
                   <button class="btn btn-sm btn-outline-danger" onclick="onremove(this)">Remove</button>
        </div>
        </li>`
    })
    result+=`</ul>`;
todoContainer.innerHTML=result;
  }
    createtodoList(todoArr);


const onaddTodo = (eve) =>{
    eve.preventDefault();
    let obj={
        todoItem:todoItem.value,
        todoid:generateUuid()
    }
    todoArr.unshift(obj);
    localStorage.setItem('todoArr',JSON.stringify(todoArr))
    let newli=document.createElement('li')
    newli.className='list-group-item d-flex justify-content-between'
    newli.id=obj.todoid
    newli.innerHTML=`<strong>${todoItem.value}</strong>
    <div>
    <button class="btn btn-sm btn-outline-info" onclick="ontodoedit(this)">Edit</button>
    <button class="btn btn-sm btn-outline-danger" onclick="onremove(this)">Remove</button>
    </div>`
    todoContainer.prepend(newli)
    Swal.fire({
        title:`TodoItem ${obj.todoItem} addedd successfully`,
        icon:"success",
        draggable:true
    })
todoForm.reset()
}
const ontodoupdate =()=> {
    let updateTodo={
        todoItem:todoItem.value,
        todoid:localStorage.getItem('editid')
    }
    let getindex = todoArr.findIndex(todo=>{
        todo.todoid === updateTodo.todoid
    })
    todoArr[getindex]=updateTodo;
    localStorage.setItem('todoArr',JSON.stringify(todoArr))
    todoForm.reset()
    let li=document.getElementById(localStorage.getItem('editid'))
    li.firstElementChild.innerHTML=updateTodo.todoItem
    addTodo.classList.add('d-none')
    updateTodo.classList.remove('d-none')
    Swal.fire({
        title:`TodoItem ${obj.todoItem} updated successfully`,
        icon:"success",
        draggable:true
    })

}
todoForm.addEventListener('submit',onaddTodo);
updateTodo.addEventListener('click',ontodoupdate);

