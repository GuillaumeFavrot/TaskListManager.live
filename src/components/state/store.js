import { configureStore } from '@reduxjs/toolkit'
import { listsReducer } from './features/listsSlice'
import viewReducer from './features/viewSlice'


export default configureStore({
  reducer: {
    lists: listsReducer,
    view: viewReducer
  }
})