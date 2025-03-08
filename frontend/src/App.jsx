import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import EnrolledCoursesTable from "./components/EnrolledCoursesTable";
//import TeacherHome from "./components/TeacherHome";
//import Signup from "./components/auth/Signup";


const appRouter = createBrowserRouter([
  // For Job Seeker
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  { 
    path: "/profile", 
    element: <Profile /> 
  },
  { 
    path: "/courses", 
    element: <EnrolledCoursesTable /> 
  },
  /*{
    path:"/teacherHome",
    element:<TeacherHome/>
  }*/
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
