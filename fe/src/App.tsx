import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
// import UserLayout from './layouts/UserLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path='/' element={<UserLayout/>}> */}
        <Route path='/' element={<Home />} />
      {/* </Route> */}
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}
export default App
