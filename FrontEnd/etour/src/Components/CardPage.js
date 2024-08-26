// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CardPage.css';

// const CardPage = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (CatId) => {
//     navigate(`/details/${CatId}`);
    
//   };
//   const handlePackageClick = (CatId) => {
//     navigate(`/Packages/${CatId}`);
    
//   };

//   return (
//     <div className="card-container">
//       <div className="card" onClick={() => handleCardClick('IN')}>
//         <h2>International</h2>
//         <p>Explore international destinations</p>
//       </div>
//       <div className="card" onClick={() => handleCardClick('DOM')}>
//         <h2>Domestic</h2>
//         <p>Discover domestic tours</p>
//       </div>
//       <div className="card" onClick={() => handlePackageClick('PKG')}>
//         <h2>Packages</h2>
//         <p>Exciting adventure tours</p>
//       </div>
     
//     </div>
//   );
// };

// export default CardPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardPage.css';

const CardPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (CatId) => {
    navigate(`/details/${CatId}`);
  };

  const handlePackageClick = (CatId) => {
    navigate(`/Packages/${CatId}`);
  };

  return (
    <div className="card-container">
      <div className="card" onClick={() => handleCardClick('IN')}  >
        <img src="/in.png" alt="International" className="card-image" />
        <h2>International</h2>
        <p>Explore international destinations</p>
      </div>
      <div className="card" onClick={() => handleCardClick('DOM')}>
        <img src="/dom.png" alt="Domestic" className="card-image" />
        <h2>Domestic</h2>
        <p>Discover domestic tours</p>
      </div>
      <div className="card" onClick={() => handlePackageClick('PKG')}>
        <img src="/gg.jpg" alt="Packages" className="card-image" />
        <h2>Packages</h2>
        <p>Explore our diverse eTour packages and find your perfect adventure!</p>
      </div>
    </div>
  );
};

export default CardPage;
