import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const accessorSlice = createSlice({
  name: 'accessor',
  initialState: {
    value: Cookies.get('access_token')
  },
  reducers: {
    getAccessToken: state => {
      return state.value
    },
    setAccessToken: (state, access_token) => {
      state.value = access_token.payload
    }
  }
})

export const { getAccessToken, setAccessToken } = accessorSlice.actions

export default accessorSlice.reducer