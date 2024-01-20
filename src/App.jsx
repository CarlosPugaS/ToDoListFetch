import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

function App() {

  let [textInput, updateTextInput] = useState("");
  let [todoList, updateTodoList] = useState([]);
  let [userName, updateUserName] = useState("juanito")

  useEffect(()=> {
    createUser(userName)
    getUserToDoList();
  }, []);

  function handleInputOnChange(evento){
    updateTextInput(evento.target.value);
  }

  function handleCreateTaskOnClick(evento){
    createTodo();
  }

  function handleOnKeyDown(evento){
    if(evento.key === "Enter"){
      createTodo();
  }
  }

  function createUser(name){
    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + name, {
      method: "POST",
      body: JSON.stringify ([]),
      headers: {
        "content-type": "application/json",
        }
    })
      .then((response)=> {
        return response.json();
      })
      .then((data)=> {
        console.log(data);
      })
      .catch((error)=> {
        console.log(error);
      })
  }

  function getUserToDoList(){
    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + userName)
    .then((response)=> {
      return response.json();
    })
    .then((data)=> {
      console.log(data);
      updateTodoList(data);
/*      {
        "done": false,
        "id": "d048a25aa2c340468ff2f7b8b131a6c9",
        "label": "example task"
        }
*/        
    })
    .catch((error)=> {
      console.log(error)
    });
  }

  function createTodo(){

    let nuevoArray = Array.from(todoList);
    nuevoArray.push(
                        {label: textInput,
                        done: false
                        })

    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + userName, {
      method: "PUT",
      body: JSON.stringify(nuevoArray),
      headers:{
        "content-type": "application/json",
      } 
    })
    .then((response)=> {
      return response.json();
    })
    .then((data)=> {
      console.log(data); //   {"msg": "3 tasks were updated successfully"}
      getUserToDoList();
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  return (
    <>
      <h1>Todo list</h1>
      <input type="text" onChange={handleInputOnChange} onKeyDown={handleOnKeyDown}/>
      <button onClick={handleCreateTaskOnClick}>Agregar tarea</button>
      <ul>
          {
            todoList.map((item, index)=> {
              return <li key={index}>{item.label}</li>
            })
          }
      </ul>
    </>
  )
}

export default App
