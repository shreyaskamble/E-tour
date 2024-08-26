import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import {Botton,Container,Row,Col} from 'react-bootstrap'
import Header from './Components/header1';
//import Home from './Pages/Home';
//import RegFormComp from './Components/RegFormComp';
import Slider from './Components/Slider';
import Crawling from './Components/Crawling';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import './i18n';
import LanguageSelector from './LanguageSelector';
import Welcome from './Components/Welcome';




function App() {
  return (
    <>
     <Header />
       <Slider /> 
      
       
      
      
      <div> <Crawling /></div>
     
      <div className="ref"><Outlet /></div>
      <Footer />
      </>
    

  );
}

export default App;
