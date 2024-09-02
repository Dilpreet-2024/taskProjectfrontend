import React from 'react'

const AddBooks = React.lazy(() => import('./AddBooks'))
const ViewBooks = React.lazy(() => import('./ViewBooks'))
const UpdateBooks = React.lazy(() => import('./UpdateBooks'))
const DeleteBooks = React.lazy(() => import('./DeleteBooks'))



const routes = [
   
  { path: '/AddBooks', name: 'Add Books Page', element: AddBooks },
  { path: '/ViewBooks', name: 'View Books Page', element: ViewBooks },
  { path: '/UpdateBooks', name: 'Update Books Page', element: UpdateBooks },
  { path: '/DeleteBooks', name: 'Delete Books Page', element: DeleteBooks },
  
  ]

export default routes
