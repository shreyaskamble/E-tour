// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap'; // Make sure to import the Button component

// export function SubSector() {
//   const [post, setPost] = useState([]);
//   const { catId } = useParams();
//   let navigate = useNavigate();
//   useEffect(() => {
//     fetch("http://localhost:8081/api/categorymaster/bycatId/" + catId)
//       .then(res => res.json())
//       .then(result => {
//         setPost(result);
//         console.log(result);
//       });
//   }, []);

//   return (
    
//     <div>
//     <div className="d2">
      
//       {post.map(category => (
//         <div className="card text-center" key={category.catId}>
//           <div className="card-body">
//             <h5 className="card-title">{category.catName}</h5>
//             {/* <p className="card-text">{category.catImagePath}</p> */}
//               {/*<Button onClick={() => navigate(`/bysubcatId/${category}`)}>View Details</Button>*/}
//               <Button onClick={() => navigate(`/bysubcatId/${category.catId}`)}>View Details</Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//   );
// }

// export default SubSector;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Make sure to import the Button component

export function SubSector() {
  const [post, setPost] = useState([]);
  const { catId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/api/byCategory/" + catId)
      .then(res => res.json())
      .then(result => {
        setPost(result);
        console.log(result);
      });
  }, []);

  const onhandleclick = async (category) => {
    try {
      // Check the flag value
      console.log(category.flag);
      if (category.flag == "N") {
        // Redirect to /bycatId/:categoryId if flag is 'Y'
        console.log("here ");
        console.log(category.catId);
        navigate(`/bysubcatId/${category.catId}`)
      } else {
        // Redirect to /bypkgId/:categoryId if flag is not 'Y'
        navigate(`/bypkgId/${category.catMasterId}`);
      }
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };


  return (
    
    <div>
    <div className="d2">
      
      {post.map(category => (
        <div className="card text-center" key={category.catId}>
          <div className="card-body">
            <h5 className="card-title">{category.catName}</h5>
            {/* <p className="card-text">{category.catImagePath}</p> */}
              {/*<Button onClick={() => navigate(`/bysubcatId/${category}`)}>View Details</Button>*/}
              { <img src={category.catImagePath} alt="No Image Found" width="250" height="200" /> }
              
          </div>
          <Button onClick={() => onhandleclick(category)}>View Details</Button>
        </div>
      ))}
    </div>
  </div>
  );
}

export default SubSector;





