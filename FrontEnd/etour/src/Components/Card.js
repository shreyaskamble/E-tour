import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card as BootstrapCard } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './Card.css';

export function Card() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { CatId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/categories/bycategory/${CatId}`)
      .then(res => res.json())
      .then(result => setPosts(result))
      .catch(error => console.error('Error:', error));
  }, [CatId]);

  const handleButtonClick = (category) => {
    try {
      if (category.flag === 0) {
        navigate(`/bypakage/${category.cat_id}`);
      } else {
        navigate(`/byCategory/${category.catmaster_id}`);
      }
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title text-center mb-5">Tours & Packages</h1>
      <Row className="justify-content-center">
        {posts.map(category => (
          <Col key={category.catmaster_id} lg={3} md={4} sm={6} className="mb-4" style={{width:"vw" , height: 'Auto'}}>
            <BootstrapCard className="custom-card shadow-sm" style={{width:"300px"}}>
              <div className="img-container"  style={{
                    width: 'Auto',
                    height: '300px',
                    objectFit: 'cover' // Ensures the image covers the area without distortion
                  }}  >
                <BootstrapCard.Img
                  variant="top"
                  src={category.cat_image_path}
                  alt={category.cat_name}
                  className="card-img-top"
                 
                
                />
              </div>
              <BootstrapCard.Body className="text-center">
                <BootstrapCard.Title className="card-title">{category.cat_name}</BootstrapCard.Title>
                <Button
                  className="card-button mt-3"
                  onClick={() => handleButtonClick(category)}
                >
                  View Details
                </Button>
              </BootstrapCard.Body>
            </BootstrapCard>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Card;
