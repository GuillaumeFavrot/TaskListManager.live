import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PencilIcon, CheckIcon, XIcon, TrashIcon } from '@primer/octicons-react'
import {modifyList} from './state/features/listsSlice'
import {deleteList} from './state/features/listsSlice'
import TaskElement from './TaskElement'

function ListCard({list}) {

  const dispatch = useDispatch()

  //States

    //Global
  const view = useSelector(state => state.view)

  const lists = useSelector(state => state.lists.lists)

    //Local
  const [formState, setFormState] = useState('collapsed')

  const [newListInformations, setNewListInformations] = useState({
    _id: '',
    name: '',
    dueDate: '',
    image: '',
    comment: '',
    priority:'',
    tasks: []
  })

  const [newTask, setNewTask] = useState({
    name: '',
    realisation: false
  })

  //List info query function

  const getListData = () => {
    for (let updatedlist of lists) {
      if(updatedlist['_id'] === list['_id']) {
        return updatedlist
      }
    }
  }

  //Form information gatherers

  const onListInfoChange = (e) => {
    if(e.target.attributes[0].value === 'priority') {
      setNewListInformations(newListInformations => ({...newListInformations, [e.target.attributes[0].value]: e.target.value}))
    }
    else {
      setNewListInformations(newListInformations => ({...newListInformations, [e.target.name]: e.target.value}))
    }
  }

  const onTaskNameChange = (e) => {
    setNewTask(newTask => ({...newTask, [e.target.name]: e.target.value}))
  }

  //Database update function

  const modificationSubmit = (e) => {
    e.preventDefault()
    let updatedList = JSON.parse(JSON.stringify(getListData()))
    for (let field in newListInformations) {
      if (newListInformations[field] !== "" && field !== 'tasks')
      updatedList[field] = newListInformations[field]
    }
    setFormState('collapsed')
    dispatch(modifyList(updatedList))
    setNewListInformations({
      _id: '',
      name: '',
      dueDate: '',
      image: '',
      comment: '',
      priority: '',
      tasks: []
    })
  }

  const taskSubmit = (e) => {
    e.preventDefault()
    let updatedList = JSON.parse(JSON.stringify(getListData()))
    updatedList.tasks.push(newTask)
    dispatch(modifyList(updatedList))
    setFormState('collapsed')
    setNewTask({
      name: '',
      realisation: false
    })
  }

  const deleteRequest = (e) => {
    let confirmation = window.confirm('Etes-vous sûr de vouloir surprimer cette liste?')
    if(confirmation) {
      dispatch(deleteList(list))
    }
  }

  //Priority display function

  let priority

  switch(list.priority) {
    case ('high') :
      priority = 'danger'
      break;
    case ('medium') :
      priority = 'warning'
      break;
    case ('low') :
      priority = 'success'
      break;
    default:
      break;
  }

  let prorityClass = `form-control mb-2 bg-${priority}`

  //Completion rate display function

  let taskCompleted = 0

  for (let task of list.tasks) {
    if (task.realisation === true) {
      taskCompleted += 1
    }
  }

  let progression = taskCompleted/list.tasks.length*100

  let percentage = progression.toString() + '%'


  let date = new Date(list.dueDate)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  date = date.toLocaleDateString('fr-FR', options).toString()

  return (
    <div >
      <div className={view.theme === 'dark' ? "card mt-3 mb-2 ms-2 bg-dark text-light" : "card mt-3 mb-2 ms-2 bg-light text-dark"}>
        
        {/*List display card*/}
        
        <div className={formState === 'expanded' ? 'd-none' : 'd-block'}>
          <img className={list.image === "" ? "d-none" : "d-block card-img-top" } src={list.image} alt="Card cap"></img>
          <div className="card-body">
            <div className='d-flex justify-content-between align-items-center'>
              <h5 className="card-title mt-1">{list.name}</h5>
              <button onClick={() => setFormState('expanded')} className='navbar-toggler' type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <PencilIcon size={16} />
              </button>
            </div>
            <input type='checkbox' className={prorityClass}/>
            <p className={list.dueDate ==='' ? "card-text d-none" : "card-text d-block"}>A faire pour le {date}</p>
            <h6 className={list.comment ==='' ? "card-text d-none" : "card-text d-block"}>{list.comment}</h6>
            <div className={list.tasks.length === 0 ? "d-none" : "d-block" }>
              <hr/>
                <h6 className={progression === 100 ? 'd-none' : 'd-block'}>Progression</h6>
                <h6 className={progression !== 100 ? 'd-none' : 'd-block text-success'}>Tâches achevées!</h6>
                <div className="progress mb-2">
                  <div className="progress-bar" role="progressbar" style={{width: percentage}} aria-valuenow={progression} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                {list.tasks.map((task)=>(
                  <TaskElement key={task.name} task={task} taskIndex={list.tasks.indexOf(task)} list={list}/>
                ))}
              <hr/>
            </div>
            <form onSubmit = {(e) => taskSubmit(e)} className='d-flex justify-content-between align-items-center'>
              <input onChange ={(e) => onTaskNameChange(e)} value={newTask.name} type="text" name='name' className="form-control mt-1" placeholder='Nouvelle tâche'/>
              <button className={view.theme === 'dark' ? 'btn btn-outline-light mt-1 ms-1' : 'btn btn-outline-dark mt-1 ms-1'} type="submit" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <CheckIcon size={16} className='text-success' />
              </button>
            </form>
          </div>
        </div>

        {/*List update form*/}

        <div className='container'>
          <form onSubmit = {(e) => modificationSubmit(e)} className={formState === 'expanded' ? 'd-block' : 'd-none'}>
            <h5 className='mt-3'>Modification de liste</h5>
            <div className='form-group'>
              <label>Intitullé</label>
              <input onChange ={(e) => onListInfoChange(e)} value={newListInformations.name} type="text" name='name' className="form-control mt-1" placeholder={list.name}/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Date butoire (optionel)</label>
              <input  onChange ={(e) => onListInfoChange(e)} value={newListInformations.dueDate} type="date"  name='dueDate' className="form-control mt-1" placeholder={list.dueDate}/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Image (optionel)</label>
              <input onChange ={(e) => onListInfoChange(e)} value={newListInformations.image} type="URL" name='image' className="form-control mt-1" placeholder={list.image}/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Commentaire (optionel)</label>
              <textarea onChange ={(e) => onListInfoChange(e)} value={newListInformations.comment} type="text" name='comment' className="form-control mt-1" placeholder={list.comment}/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Priorité</label>
              <select className='form-select mt-1' name='priority' placeholder={list.priority} required>
                <option onClick={(e) => onListInfoChange(e)} name='priority' value='high'>Haute</option>
                <option onClick={(e) => onListInfoChange(e)} name='priority' value='medium'>Moyenne</option>
                <option onClick={(e) => onListInfoChange(e)} name='priority' value='low'>basse</option>
              </select>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <button onClick={() => deleteRequest()} className="btn btn-Danger mt-3 text-danger" type='button'>
                <TrashIcon size={24} />
              </button>
              <button className="btn btn-success mt-3" type="submit">Modifier la liste</button>
              <button onClick={() => setFormState('collapsed')} className='navbar-toggler text-danger pt-3 ms-4' type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <XIcon size={32} />
              </button>
            </div>
          </form>
        </div>
         

      </div>
    </div>
  )
}

export default ListCard