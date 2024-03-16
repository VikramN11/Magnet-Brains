import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../page/Signup'
import Login from '../page/Login'
import CreateTask from '../page/CreateTask'
import TaskList from './TaskList'
import TaskDetail from '../page/TaskDetail'


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/tasks/create' element={<CreateTask/>}/>
            <Route path='/tasks' element={<TaskList/>}/>
            <Route path='/task/:id' element={<TaskDetail/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes