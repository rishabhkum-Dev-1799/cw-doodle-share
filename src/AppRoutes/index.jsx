import React from 'react'
import {Route,Routes } from 'react-router-dom'

import JoinRoompage from '../pages/JoinRoompage'
import CreateRoomPage from '../pages/CreateRoomPage'
import Homepage from '../pages/homepage'
import SketchRoomPage from '../pages/SketchRoomPage'

const AppRoutes = () => {
  return (
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/join-room' element={<JoinRoompage/>}/>
            <Route path='/create-room' element={<CreateRoomPage/>}/>
            <Route path='/room/:roomId' element={<SketchRoomPage/>}/>
        </Routes>
  )
}

export default AppRoutes;