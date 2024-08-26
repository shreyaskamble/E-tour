import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Card() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category data from the API when the component mounts
    fetch('http://localhost:8080/api/categories')
      .then(res => res.json())
      .then(result => setPosts(result))
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

  const handleButtonClick = (category) => {
     try {
      // Check the flag value
      console.log(category.flag);
      if (category.flag == 0) { // Use === for strict comparison
        // Redirect to /category/:categoryId if flag is 'true'
        console.log(category.catmaster_id);
        navigate(`/bypakage/${category.catmaster_id}`);
      } else {
        // Redirect to /bycatId/:categoryId if flag is not 'true'
        navigate(`/categories/${category.catmaster_id}`);
        console.log("hekko");
      }
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  };

  return (
    <div>
      <div className="d2">
        {posts.map(category => (
          <div className="card text-center" key={category.catmaster_id}>
            <div className="card-body">
              <h5 className="card-title">{category.cat_name}</h5>
              <img src={category.cat_image_path} alt="No Image Found" width="150px" height="auto" />
            </div>
            <Button onClick={() => handleButtonClick(category)}>View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;