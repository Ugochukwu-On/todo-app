import { useState } from "react"
import {useCookies} from 'react-cookie'


const  Modal= ({mode, setShowModal, getData, task})=> {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode==='edit'?  true: false
  const [data, setData] = useState({
    userId: editMode? task.userId:cookies.Email,
    title: editMode? task.title:null,
    status: editMode? task.status:null,
    progress:editMode? task.progress:50,
    createdAt: editMode? task.date: new Date()
  })

  const postData = async (e)=>{
    
    try {
        const response = await fetch('http://localhost:3001/todos/create-todo',{
          method:"POST",
          headers:{'Content-Type':'application/json' },
          body: JSON.stringify(data)
        })
        if(response.status === 200){
          console.log('WORKED')
          setShowModal(false)
          getData()
        }
    } catch (err) {
      console.error(err)
    }
  }

const editData = async (e)=>{

  try {
    const response = await fetch(`http://localhost:3001/todos/update-todo/${task.userId}`,{
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(data)
    })
    if (response.status === 200){
      setShowModal(false)
      getData()
    }
  } catch (err) {
    console.error(err)
    
  }
}


  const handleChange = (e)=>{
    const{name, value} = e.target

    setData(data=>({
      ...data,
      [name]: value
    }))
    console.log(data)
  }


  return (
      <div className = "overlay">
        <div className ="modal ">
          <div className="form-title-container">
            <h3>Let's {mode} your task</h3>
            <button onClick={()=>setShowModal(false)}>X</button>
          </div>
          <form>
            <input
              required
              maxLength ={30}
              name="title"
              value={data.title}
              placeholder ="task goes here"
              onChange={handleChange}
            />
            <br/>
            <label for = "range">Drag to select your current progress </label>
            <input
            required
            type="range"
            id="range"
            min ="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
            />
         
            <input className={mode} type = "submit" onClick={editMode? editData: postData}/> 
          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  