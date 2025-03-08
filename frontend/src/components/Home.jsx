import  { useEffect } from 'react'
import Navbar from "./shared/Navbar";
//   import Footer from './shared/Footbar';
import MiddleSection from './MiddleSection';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import Footer from "./shared/Footer";


const Home = () => {
  /*const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'Teacher') {
      navigate("/teacherHome");
    }
  }, []);*/
  return (
    <div>
      <Navbar />
      <MiddleSection />
    
    </div>
  );
};

export default Home;
