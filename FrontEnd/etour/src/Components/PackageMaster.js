import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button ,Card, Row,Col} from 'react-bootstrap';

function PackageMaster() {
  const { catMasterId } = useParams();
  const [post, setPost] = useState({});
  const [date, setDate] = useState([]);

  sessionStorage.setItem("catid", catMasterId);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/subCategories/${catMasterId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        setPost(result);
        console.log('SubCategories fetched:', result);
      })
      .catch(error => console.error('Error fetching subCategories:', error));
  }, [catMasterId]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/dateMaster/${catMasterId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        console.log('DateMaster fetched:', result);
        setDate([result]);
        sessionStorage.setItem("did", result.departureId);
      })
      .catch(error => console.error('Error fetching dateMaster:', error));
  }, [catMasterId]);

  // const handleButtonClick = (dat) => {
  //   console.log('Button clicked with data:', dat);
  //   sessionStorage.setItem("did", dat.departureId);
  
  //   // if (post && post.catMasterId && date.length > 0) 
  //     {
  //     console.log('Fetching data for pkgId...');
  
  //     fetch(`http://localhost:8080/api/catdat/${post.catMasterId}/${dat.departureId}`)
  //       .then(res => {
  //         if (!res.ok) {
  //           throw new Error(`Network response was not ok: ${res.statusText}`);
  //         }
  //         return res.json();
  //       })
  //       .then(result => {
  //         console.log('Fetched result:', result);
  //         // Check if pkgId exists in the response object
  //         if (result && result.catmaster_id) {
  //           // sessionStorage.setItem("pkgid", result.pkgId);
  //           // sessionStorage.setItem("departdate", dat.departDate);
  //           navigate(`/bycostMasterId/${catMasterId}`);
  //         } 
  //         else {
  //           console.error('pkgId not found in result:', result);
  //           navigate(`/bycostMasterId/${catMasterId}`);
  //         }
  //       })
  //       .catch(error => {
  //         console.error("Error fetching data:", error);
  //       });
  //   } 
  //   // else {
  //   //   console.error('Post or date not available');
  //   // }
  // };
  

  return (
    <div>
    <h1 align="center" style={{ color: 'red' }}>Packages</h1>
    <Row>
      {date.map(dat => (
        <Col md={4} key={dat.departureId} style={{ marginBottom: '1rem' }}>
          <Card>
            <Card.Img variant="top" src={dat.imageUrl || 'default-image.jpg'} alt="Package Image" />
            <Card.Body>
              <Card.Title>{post.subCat_name || 'hello'}</Card.Title>
              <Card.Text>
                <strong>Departure Date:</strong> {dat.departDate.split('T')[0]}<br />
                <strong>End Date:</strong> {dat.endDate.split('T')[0]}<br />
                <strong>Number of Days:</strong> {dat.noOfDays}
              </Card.Text>
              {/* <Button variant="primary" onClick={() => handleButtonClick(dat)}>View Details</Button> */}
              <Button variant="primary" onClick={() => navigate(`/byCategory/${post.subCat_id}`)}>View Details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
  );
}

export default PackageMaster;