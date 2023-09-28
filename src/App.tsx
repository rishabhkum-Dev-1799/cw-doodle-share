import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import JoinRoompage from './pages/JoinRoompage';
import CreateRoomPage from './pages/CreateRoomPage';
import SketchRoomPage from './pages/SketchRoomPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/join-room' element={<JoinRoompage />} />
        <Route path='/create-room' element={<CreateRoomPage />} />
        <Route path='/room/:roomId' element={<SketchRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
