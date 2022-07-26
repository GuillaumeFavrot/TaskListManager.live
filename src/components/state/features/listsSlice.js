import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  lists: [],
  loading: false,
  message: ''
}

const url = 'http://127.0.0.1:8000/'

export const getLists = createAsyncThunk(
  'lists/getLists',
  async () => {
    const res = await fetch(`${url}api/lists`).then(
    (data) => data.json()
  )
  return res
})

export const addList = createAsyncThunk(
  'lists/addList',
  async (list) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/lists`,
        {
          method: 'POST',
          body: JSON.stringify(list),
          header: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return data
      }
)

export const modifyList = createAsyncThunk(
  'lists/modifyList',
  async (list) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/lists`,
        {
          method: 'PUT',
          body: JSON.stringify(list),
          header: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return data
      }
)

export const deleteList = createAsyncThunk(
  'lists/deleteList',
  async (list, { rejectWithValue }) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/lists`,
        {
          method: 'DELETE',
          body: JSON.stringify(list._id),
          header: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return data
    }
)

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: {
    [getLists.pending]: (state) => {
      state.loading = true
    },
    [getLists.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.lists = payload
    },
    [getLists.rejected]: (state) => {
      state.loading = false
    },
    [addList.pending]: (state) => {
      state.loading = true
    },
    [addList.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.lists = payload
    },
    [addList.rejected]: (state) => {
      state.loading = false
    },
    [modifyList.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.lists = payload
    },
    [deleteList.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.lists = payload
    }
  },
})

export const listsReducer = listsSlice.reducer