import { createSlice } from '@reduxjs/toolkit'

const viewSlice = createSlice({
  name: 'view',
  initialState : 
    {
      theme: 'dark',
      background: 'https://24wallpapers.com/app-gateway/wallpaper-uploads/wallpapers/legacyUploads/wi433b4b2aa15-1396-4f40-86d4-5831df5d3ad63.jpg'
    }
  ,
  reducers: {
    modifyTheme(state, action) {
      state.theme = action.payload
    },
    modifyBackground(state, action) {
      state.background = action.payload
    }
  }
})
 
export const { modifyTheme, modifyBackground } = viewSlice.actions
export default viewSlice.reducer