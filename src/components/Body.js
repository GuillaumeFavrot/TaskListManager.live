import React, {useEffect} from 'react'
import ListCard from './ListCard'
import ListForm from './ListForm'
import { useSelector, useDispatch } from 'react-redux'
import {getLists} from './state/features/listsSlice'

function Body() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLists())
  }, [])

  const lists = useSelector(state => state.lists.lists)

  const view = useSelector(state => state.view)

  return (
    <div className='mainPage pt-5' style={{background: `url(${view.background}) no-repeat center`}}>
      <div className='d-flex flex-row'>
        <div className='d-flex flex-row'>
          {lists.map((list)=>(
            <ListCard key={list['_id']} list = {list}/>    
          ))}
        </div>
        <div>
          <ListForm />
        </div>
      </div>
    </div>
  )
}

export default Body