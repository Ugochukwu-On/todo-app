import { useState } from 'react';
import TickIcon from './TickIcon'
import Modal from './Modal';
import ProgressBar from './ProgressBar'

const  ListItem= ({task, getData})=> {
const [showModal, setShowModal] = useState(false)

    const deleteItem = async ()=>{
     
      try {
        const response = await fetch(`http://localhost:3001/todos/delete-todo/${task.userId}`, {
          method: "DELETE",
        });
           if(response.status===200){
          getData()
        }
      } catch (err) {
        console.error(err)
      }
    }
    return (
      <li className="list-item">
          
          <div className="info-container">
                  <TickIcon/>
                  <p className="task-title">{task.title}</p>
                  <p className="status-item">{task.status}</p>
                  <p>{task.description}</p>
                  <ProgressBar/>
            </div>

            <div className='button-container'>
                    <button className='edit' onClick={()=>setShowModal(true)}>Edit</button>
                    <button className='delete' onClick={deleteItem}>Delete</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
      </li>
    );
  }
  
  export default ListItem;
  