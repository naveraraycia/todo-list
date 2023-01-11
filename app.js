const date = new Date().toLocaleDateString()
document.querySelector('.date').innerHTML = date

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('#clearBtn')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

listenToEvents()

function listenToEvents(){

  document.addEventListener('DOMContentLoaded', loadLocalStorage)
  
  form.addEventListener('submit', addTask)

  taskList.addEventListener('click', removeTask)

  clearBtn.addEventListener('click', clearTasks)

  filter.addEventListener('keyup', filterTasks)
}

function addTask(e){
  if(taskInput.value === ''){
    alert('Please Add a task')
  } else {

    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))
  
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa-regular fa-lg fa-circle-xmark"></i>'
  
    li.appendChild(link)
  
    taskList.appendChild(li)
  

    addToLocalStorage(li.innerText)
  
    taskInput.value = ''
  }


  e.preventDefault()
}

function removeTask(e){
  
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete this task?')){
      e.target.parentElement.parentElement.remove()
  
      removeFromLocalStorage(e.target.parentElement.parentElement.innerText)
    }
  }
}

function clearTasks(e){
  taskList.innerHTML = ''

  localStorage.clear()
}

function addToLocalStorage(task){
  let tasksArray
  if(localStorage.getItem('tasks') === null){
    tasksArray = []
  } else {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
  }

  tasksArray.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function loadLocalStorage() {
  let tasksArray
  if(localStorage.getItem('tasks') === null){
    tasksArray = []
  } else {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
  }

  tasksArray.forEach(function(taskItem){
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.innerText = taskItem

    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa-regular fa-lg fa-circle-xmark"></i>'

    li.appendChild(link)
    taskList.appendChild(li)
  })
}

function removeFromLocalStorage(task){
  let tasksArray
  if(localStorage.getItem('tasks') === null){
    tasksArray = []
  } else {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
  }

  tasksArray.forEach(function(taskItem, index){
    
    if(task === taskItem){
      tasksArray.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function filterTasks(e){

  document.querySelectorAll('li.collection-item').forEach(function(listItem){
    const item = listItem.innerText.toLowerCase()

    if(item.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1){
      listItem.style.display = 'block'
    } else {
      listItem.style.display = 'none'
    }
  })
}

