
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import { useAuthContext } from './context/AuthContext.jsx'
import DataTable from './components/datatable/DataTable.jsx'
import DataCard from './components/datacard/DataCard.jsx'
import { useState } from 'react'
// import { AuthProvider } from './context/AuthContext.jsx'

function App() {

  const {authUser} = useAuthContext()

  return <div className='p-4 h-screen flex items-center justify-center'>
    {/* <Signup /> */}
    {/* <AuthProvider>
      <Router> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dataTable' element={<DataTable />} />
          <Route path='/user/:id' element={<DataCard />} />



        </Routes>
      {/* </Router>
    </AuthProvider> */}
  </div>
}

export default App
