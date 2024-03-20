import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from "./pages/NotFound"
import Start from "./pages/Start"
import Game from "./pages/Game"
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
    errorElement: <NotFound />,
  },
  {
    path: '/game',
    element: <Game />,
    errorElement: <NotFound />,
  } 
]);

function App() {

  return <>
  <RouterProvider router={router} />
</>
}

export default App
