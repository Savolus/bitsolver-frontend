import { configureStore } from '@reduxjs/toolkit'

import accessorSlice from './accessorSlice'

export default configureStore({
  reducer: {
    accessor: accessorSlice
  }
})