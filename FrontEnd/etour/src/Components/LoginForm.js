import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './LoginForm.css'; // Import custom CSS

function LoginForm() {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const catid = sessionStorage.getItem("catid");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/customers/customer/login/${username}/${password}`);
      const result = await response.json();

      if (result === '') { // if login failed empty string returned
        alert(t('login_failure'));
         // Use translation for failure message
         navigate('/');
         
      } else {
        alert("!!! User Logged In successfully !!!");
        sessionStorage.setItem("uid", result.custId);
        const storedCustId = sessionStorage.getItem("uid");
        console.log("User ID:", storedCustId);
        navigate('/');
        console.log("hello");

        // if (catid === null) {
        //   alert(t('login_failure'));
        //   navigate('/');
        // } else {
        //   navigate(`/bypassenger/${catid}`);
        // }
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col md={6} lg={4} id="logn">
            <Card className="shadow-lg rounded" id='cbdy'>
              <Card.Body>
                <Card.Title className="text-center mb-4" id='ttl'>{t('login_title')}</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>{t('username_label')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('username_placeholder')}
                      value={username}
                      onChange={handleUsernameChange}
                      required
                      className="login-input"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>{t('password_label')}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t('password_placeholder')}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="login-input"
                    />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit" className="w-100 mb-2 login-button">
                    {t('login_button')}
                  </Button>
                  
                  <Button 
                    variant="link" 
                    onClick={() => navigate(`/Register`)}
                    className="w-100 text-center d-block"
                  >
                    {t('go_to_registration')}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginForm;
