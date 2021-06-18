import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const accessorSlice = createSlice({
  name: 'accessor',
  initialState: {
    value: Cookies.get('access_token')
  },
  reducers: {
    removeAccessToken: state => {
      state.value = Cookies.remove('access_token')
    },
    setAccessToken: (state, access_token) => {
      state.value = access_token.payload
    }
  }
})

export const { removeAccessToken, setAccessToken } = accessorSlice.actions

export default accessorSlice.reducer