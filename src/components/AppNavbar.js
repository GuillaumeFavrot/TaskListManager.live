import { Collapse } from 'bootstrap';
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {modifyTheme, modifyBackground} from './state/features/viewSlice'

  function AppNavbar() {

    const view = useSelector(state => state.view)
    const dispatch = useDispatch()

    const [menuToggle, setMenuToggle] = useState(false)

    const [newImage, setNewImage] = useState('')

    const toggleOn = () => {
      setMenuToggle(true)
    }

    const toggleOff = () => {
      setMenuToggle(false)
    }

    const themeToogle = (request) => {
      dispatch(modifyTheme(request))
      toggleOff()
    }

    const newImageLink = (e) => {
      setNewImage(e.target.value)
    }

    const sendImage = (e) => {
      e.preventDefault()
      dispatch(modifyBackground(newImage))
      setNewImage('')
      toggleOff()
    }

    return (
      <div className='mainNavBar'>
        <nav className={view.theme === 'dark' ? "fixed-top navbar navbar-dark navbar-expand-lg bg-dark border-bottom border-secondary" : "fixed-top navbar navbar-light navbar-expand-lg bg-light border-bottom border-dark"}>
          <div className="container-fluid">
            <button onMouseEnter={() => toggleOn()} onMouseLeave={() => toggleOff()} className="navbar-toggler" type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">Gestionnaire de tâches</a>
            <div onMouseEnter={() => toggleOn()} onMouseLeave={() => toggleOff()} className={menuToggle ? "navbar-collapse" : "collapse navbar-collapse"} id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a onClick={() => toggleOff()} className="nav-link" href="https://github.com/GuillaumeFavrot">Github</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Paramêtres
                  </a>
                  <ul className={view.theme === 'dark' ? "dropdown-menu dropdown bg-dark" : "dropdown-menu dropdown bg-light"}>
                    <li><a onClick={() => themeToogle('light')} className={view.theme === 'dark' ? "dropdown-item text-light": "dropdown-item text-dark"}>Thème clair</a></li>
                    <li><a onClick={() => themeToogle('dark')} className={view.theme === 'dark' ? "dropdown-item text-light": "dropdown-item text-dark"}>Thème sombre</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li>
                      <form className="dropdown-item">
                          <label className={view.theme === 'dark' ? "form-label text-light": "form-label bg-light text-dark"}>Choisissez un fond d'écran personalisé</label>
                          <div className='d-flex'>
                            <input onChange={(e) => newImageLink(e)} value={newImage} type="text" name='newImage' className="form-control me-2" placeholder='Entrez votre URL'></input>
                            <button onClick={(e) => sendImage(e)} className={view.theme === 'dark' ? 'btn btn-outline-light' : 'btn btn-outline-dark'}>Envoyer</button>
                          </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

export default AppNavbar
