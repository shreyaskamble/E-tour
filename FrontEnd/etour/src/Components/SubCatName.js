



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, Row, Col, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
// import './subCatName.css';

// export function SubCatName() {
//   let navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [costs, setCosts] = useState([]);
//   const [date, setDate] = useState([]);
//   const { subCatId } = useParams();
//   console.log(subCatId + " in SubCatName");


//   useEffect(() => {
//     fetch(`http://localhost:8080/api/dateMaster/subcategory/${subCatId}`)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return res.json();
//       })
//       .then(result => {
//         console.log('DateMaster fetched:', result);
//         setDate(result[0]);
//         sessionStorage.setItem("did", result[0].departureId);
//       })
//       .catch(error => console.error('Error fetching dateMaster:', error));
//   }, [subCatId]);

//   useEffect(() => {
//     // Fetch posts based on subCatId
//     fetch(`http://localhost:8080/api/byCategory/${subCatId}`)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return res.json();
//       })
//       .then(result => {
//         console.log('Posts fetched:', result);
//         setPosts(result);
//       })
//       .catch(error => {
//         console.error('Error fetching posts:', error);
//       });
//   }, [subCatId]);

//   useEffect(() => {
//     // Fetch costs based on subCatId
//     fetch(`http://localhost:8080/api/costsBySubCategory/${subCatId}`)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return res.json();
//       })
//       .then(result => {
//         console.log('Costs fetched:', result);
//         setCosts(result); // Assuming result is an array
//       })
//       .catch(error => {
//         console.error('Error fetching costs:', error);
//       });
//   }, [subCatId]);

//   return (
//     <div>
//       <h1 align="center" style={{ color: 'red' }}>Tours</h1>
//       <Row md={12}>
//         {posts.map(post => (
//           <Col md={4} key={post.subCat_id}>
//             <Card className="box" style={{ width: '30rem' }}>
//               <div className="img-container">
//                 <Card.Img 
//                   variant="top" 
//                   src={post.subCatImagePath} 
//                   alt={post.subCat_name} 
//                 />
//               </div>
//               <Card.Body className="content">
//                 <Card.Title>
//                   <FontAwesomeIcon icon={faMapMarkerAlt} />
//                   {post.subCat_name}
//                 </Card.Title>
//                 <Card.Text>
//                   {post.description || 'Place description is not found'} 
//                 </Card.Text>
//                 <Card.Text>
//                 <strong>Departure Date:</strong> {date?.departDate?.split('T')[0]}<br />
//                 <strong>End Date:</strong> {date?.endDate?.split('T')[0]}<br />
//                 <strong>Number of Days:</strong> {date?.noOfDays}
//               </Card.Text>
//                 <div className="stars">
//                   <FontAwesomeIcon icon={faStar} />
//                   <FontAwesomeIcon icon={faStar} />
//                   <FontAwesomeIcon icon={faStar} />
//                   <FontAwesomeIcon icon={faStar} />
//                   <FontAwesomeIcon icon={faStarRegular} />
//                 </div>
//                 {costs
//                   .filter(costItem => costItem && costItem.subCategoryMaster && costItem.subCategoryMaster.subCat_id === post.subCat_id)
//                   .map(costItem => (
//                     <div className="price" key={costItem.costId}>
//                       <span>$ {costItem.cost}</span>
//                     </div>
//                   ))
//                 }
//                 <Button onClick={() => navigate(`/bypkgId/${post.subCat_id}`)}>
//                   Book Tour
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default SubCatName;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import './subCatName.css';

export function SubCatName() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [costs, setCosts] = useState([]);
  const [dates, setDates] = useState([]); // Use dates as an array
  const { subCatId } = useParams();
  console.log(subCatId + " in SubCatName");

  useEffect(() => {
    // Fetch dates based on subCatId
    fetch(`http://localhost:8080/api/dateMaster/category/${subCatId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        console.log('DateMaster fetched:', result);
        setDates(result); // Assuming result is an array of date objects
        if (result.length > 0) {
          sessionStorage.setItem("did", result[0].departureId);
        }
      })
      .catch(error => console.error('Error fetching dateMaster:', error));
  }, [subCatId]);

  useEffect(() => {
    // Fetch posts based on subCatId
    fetch(`http://localhost:8080/api/byCategory/${subCatId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        console.log('Posts fetched:', result);
        setPosts(result);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [subCatId]);

  useEffect(() => {
    // Fetch costs based on subCatId
    fetch(`http://localhost:8080/api/costsBySubCategory/${subCatId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        console.log('Costs fetched:', result);
        setCosts(result); // Assuming result is an array
      })
      .catch(error => {
        console.error('Error fetching costs:', error);
      });
  }, [subCatId]);

  return (
    <div>
      <h1 align="center" style={{ color: 'red' }}>Tours</h1>
      <Row md={12}>
        {posts.map(post => (
          <Col md={4} key={post.subCat_id}>
            <Card className="box" style={{ width: '30rem' }}>
              <div className="img-container">
                <Card.Img 
                  variant="top" 
                  src={post.subCatImagePath} 
                  alt={post.subCat_name} 
                />
              </div>
              <Card.Body className="content">
                <Card.Title>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {post.subCat_name}
                </Card.Title>
                <Card.Text>
                  {post.description || 'Place description is not found'} 
                </Card.Text>
                {/* Assuming the dates array contains relevant date objects */}
                {dates
                  .filter(date => date.subCategoryMaster?.subCat_id === post.subCat_id) // Filter dates if needed
                  .map((date, index) => (
                    <Card.Text key={index}>
                      <strong>Departure Date:</strong> {date.departDate?.split('T')[0]}<br />
                      <strong>End Date:</strong> {date.endDate?.split('T')[0]}<br />
                      <strong>Number of Days:</strong> {date.noOfDays}
                    </Card.Text>
                  ))}
                <div className="stars">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarRegular} />
                </div>
                {costs
                  .filter(costItem => costItem && costItem.subCategoryMaster && costItem.subCategoryMaster.subCat_id === post.subCat_id)
                  .map(costItem => (
                    <div className="price" key={costItem.costId}>
                      <span>$ {costItem.cost}</span>
                    </div>
                  ))
                }
                <Button onClick={() => navigate(`/bypkgId/${post.subCat_id}`)}>
                  Book Tour
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SubCatName;
