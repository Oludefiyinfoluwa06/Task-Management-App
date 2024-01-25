import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import RootLayout from './Layouts/RootLayout';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Tasks from './routes/Tasks';
import Profile from './routes/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/tasks' element={<Tasks />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;