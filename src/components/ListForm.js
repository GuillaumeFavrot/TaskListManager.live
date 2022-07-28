import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusIcon, XIcon } from '@primer/octicons-react'
import {addList} from './state/features/listsSlice'


function ListForm() {

  const view = useSelector(state => state.view)

  const dispatch = useDispatch()

  const [formState, setFormState] = useState('collapsed')

  const [newListInformations, setNewListInformations] = useState({
    name: '',
    dueDate: '',
    image: '',
    comment:'',
    priority:'',
    tasks: []
  })

  const onChange = (e) => {
    if(e.target.attributes[0].value === 'priority') {
      setNewListInformations(newListInformations => ({...newListInformations, [e.target.attributes[0].value]: e.target.value}))
    }
    else {
      setNewListInformations(newListInformations => ({...newListInformations, [e.target.name]: e.target.value}))
    }
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch(addList(newListInformations))
    setFormState('collapsed')
    setNewListInformations({
      name: '',
      dueDate: '',
      image: '',
      comment:'',
      priority:'',
      tasks: []
    })
  }

  return (
    <div>
      <div className={view.theme === 'dark' ? "card mt-3 mb-2 ms-2 me-2 bg-dark text-light" : "card mt-3 mb-2 ms-2 me-2 bg-light text-dark"}>
        <div className="card-body">
          <div className='d-flex'>
            <button onClick={() => setFormState('expanded')} className={formState === 'expanded' ? 'navbar-toggler d-none' : 'navbar-toggler d-block'} type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <PlusIcon size={32} />
            </button>
            <h5 className={formState === 'expanded' ? "card-title mt-1": 'card-title mt-1 ms-4' }>{formState === 'expanded' ? 'Nouvelle liste' : 'Créer une liste' }</h5>
          </div>
          <form onSubmit={(e) => submit(e)} className={formState === 'expanded' ? 'd-block' : 'd-none'}>
            <div className='form-group'>
              <label>Intitullé</label>
              <input onChange ={(e) => onChange(e)} value={newListInformations.name} type="text" name='name' className="form-control mt-1" placeholder='Choisissez un nom' required/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Date butoire (optionel)</label>
              <input onChange={(e) => onChange(e)} value={newListInformations.dueDate} type="date" name='dueDate' className="form-control mt-1"/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Image (optionel)</label>
              <input onChange={(e) => onChange(e)} value={newListInformations.image} type="URL" name='image' className="form-control mt-1" placeholder='Entrez votre URL'/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Commentaire (optionel)</label>
              <textarea  onChange={(e) => onChange(e)} value={newListInformations.comment} type="text" name='comment' className="form-control mt-1" placeholder='Saisissez votre commentaire'/>
            </div>
            <div className='form-group'>
              <label className='mt-2'>Priorité</label>
              <select className='form-select mt-1' name='priority' required>
                <option></option>
                <option onClick={(e) => onChange(e)} name='priority' value='high'>Haute</option>
                <option onClick={(e) => onChange(e)} name='priority' value='medium'>Moyenne</option>
                <option onClick={(e) => onChange(e)} name='priority' value='low'>basse</option>
              </select>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <button className="btn btn-primary mt-3" type="submit">Créer la liste</button>
              <button onClick={() => setFormState('collapsed')} className='navbar-toggler text-danger pt-3' type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <XIcon size={32} />
              </button>
            </div>
          </form>  
        </div>
      </div>
    </div>
  )
}

export default ListForm