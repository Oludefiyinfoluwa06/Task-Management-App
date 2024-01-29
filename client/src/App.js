import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';

// Layouts import
import RootLayout from './Layouts/RootLayout';
import TaskLayout from './Layouts/TaskLayout';

// Routes import
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Tasks from './routes/Tasks';
import Profile from './routes/Profile';
import AddTask from './routes/AddTask';
import UpdateTask from './routes/UpdateTask';
import EditProfile from './routes/EditProfile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/edit-profile/:id' element={<EditProfile />} />
      <Route path='/tasks' element={<TaskLayout />}>
        <Route index element={<Tasks />} />
        <Route path='add' element={<AddTask />} />
        <Route path='update/:id' element={<UpdateTask />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;