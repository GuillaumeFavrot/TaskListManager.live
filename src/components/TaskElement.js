import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CheckIcon, TrashIcon } from '@primer/octicons-react'
import {modifyList} from './state/features/listsSlice'


function TaskElement({task, taskIndex, list}) {

  const dispatch = useDispatch()

  const [taskState, setTaskState] = useState('display')

  const [newTaskName, setNewTaskName] = useState('')

  const taskCompletion = (e) => {
    let updatedList = JSON.parse(JSON.stringify(list))
    for (let task of updatedList.tasks) {
      if (task.name === e.target.name) {
        task.realisation = !task.realisation
      }
    }
    dispatch(modifyList(updatedList))
  }

  const onTaskNameChange = (e) => {
    setNewTaskName(e.target.value)
  }

  const taskNameModification = (e) => {
    if (newTaskName === '') {
      setToDisplay()
    } else {
      let updatedList = JSON.parse(JSON.stringify(list))
      updatedList.tasks[taskIndex].name = newTaskName
      dispatch(modifyList(updatedList))
      setToDisplay()
      setNewTaskName('')
    }    
  }

  const taskDeleteRequest = () => {
    let updatedList = JSON.parse(JSON.stringify(list))
    updatedList.tasks.splice(taskIndex, 1)
    dispatch(modifyList(updatedList))
  }

  const setToModification = () => {
    setTaskState('modification')
  }

  const setToDisplay = () => {
    setTaskState('display')
  }

  return (
    <div>
      <form className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-start'>
          <a onClick={() => taskDeleteRequest()}className="text-danger me-1" type="submit">
            <TrashIcon size={16} />
          </a>
          <p onClick={() => setToModification()} className={taskState === 'display' ? 'mb-0 d-block' : 'd-none'}>{task.name}</p>
          <div className={taskState === 'display' ? 'd-none' : 'd-flex'}>
            <input onChange={(e) => onTaskNameChange(e)} className='form-control-sm'/>
            <a onClick={(e) => taskNameModification(e)} className="text-danger ps-1" type="submit">
              <CheckIcon size={16} />
            </a>
          </div>
          
        </div>
        <input onChange={(e) => taskCompletion(e)} className={taskState === 'display' ? 'form-check-input d-block flex-shrink-0' : 'd-none'} type='checkbox' checked={task.realisation} name={task.name}/>
      </form>
    </div>
  )
}

export default TaskElement