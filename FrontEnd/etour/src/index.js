import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import RegFormComp from './Components/RegFormComp';
import About from './Components/About';
import LoginForm from './Components/LoginForm';
import SubCatName from './Components/SubCatName';
import ContactUs from './Components/ContactUs';
import PackageMaster from './Components/PackageMaster';
import CostMasterDetails from './Components/CostMasterDetails';
import Passenger from './Components/Passenger';
import Booking from './Components/Booking';

import BookingPage from './Components/BookingPage';



import Card from './Components/Card';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
         < Route path='/' element={<App />} >
         {/* < Route path='/app' element={<App />} /> */}

         <Route path="/Home" element={<Home />} />
          <Route path="/register" element={<RegFormComp />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/bypkgId/:catid" element={<BookingPage />} /> 
          <Route path="/details/:CatId" element={<Card />} />
          <Route path="/byCategory/:subCatId" element={<SubCatName />} />
          {/* <Route path="/byCategory/:subCatId" element={<SubCatName />} /> */}
          {/* <Route path="/bypkgId/:catMasterId" element={<PackageMaster />} />  */}
          <Route path="/bypakage/:catMasterId" element={<PackageMaster />} />
          <Route path="/Packages/:CatId" element={<Card />} />
          <Route path="/bycostMasterId/:catMasterId" element={<CostMasterDetails />} /> 
          {/* <Route path="/bycostMasterId/:catid" element={<Passenger />} />  */}
          <Route path="/success-page"  element={<Booking />} />
          <Route path='/login/:pkgId' element={<LoginForm />} /> 
          <Route path="/bypassenger/:catid" element={<Passenger />} />  
           
  

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();




// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home';
// import RegFormComp from './Components/RegFormComp';
// import About from './Components/About';
// import LoginForm from './Components/LoginForm';
// import SubCatName from './Components/SubCatName';
// import ContactUs from './Components/ContactUs';
// import PackageMaster from './Components/PackageMaster';
// import CostMasterDetails from './Components/CostMasterDetails';
// import Passenger from './Components/Passenger';
// import Booking from './Components/Booking';
// import CostItinerary from './Components/CostItinerary';
// import BookingPage from './Components/BookingPage';
// import OrderPage from './Components/OrderPage';
// import SubSector from './Components/SubSector';
// import CardPage from './Components/CardPage';
// import Card from './Components/Card';
// import BookingPackage from './Components/BookingPackage';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/pp" element={<App />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/register" element={<RegFormComp />} />
//         <Route path="/About" element={<About />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/contactUs" element={<ContactUs />} />
//         <Route path="/bypkgId/:catid" element={<BookingPage />} />
//         <Route path="/bypkg/:catid" element={<BookingPackage />} />
//         <Route path="/details/:CatId" element={<Card />} />
//         <Route path="/byCategory/:subCatId" element={<SubCatName />} />
//         <Route path="/Packages/:catMasterId" element={<PackageMaster />} />
//         {/* <Route path="/Packages" element={<PackageMaster />} /> */}
//         <Route path="/byCategory/:subCatId" element={<CostMasterDetails />} />
//         <Route path="/success-page" element={<Booking />} />
//         <Route path="/login/:pkgId" element={<LoginForm />} />
//         <Route path="/bypassenger/:catid" element={<Passenger />} />
//         {/* Add any other routes you may have */}
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();



