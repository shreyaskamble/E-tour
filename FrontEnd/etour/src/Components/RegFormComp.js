import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './RegFormComp.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation


function RegFormComp() {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [customer, setCustomer] = useState({});
  let navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCustomer(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let demo = JSON.stringify(customer);
    console.log(JSON.parse(demo));

    fetch("http://localhost:8080/api/customers", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: demo
    }).then(response => {
      if (response.ok) {
        alert("Customer registered successfully!");
        navigate('/login');
      } else {
        alert("Customer registration failed.");
      }
    }).catch(error => {
      console.error("An error occurred while registering the customer:", error);
    });
  };

  return (
    <div className='container my-5'>
      <Form onSubmit={handleSubmit} className='p-4 border rounded shadow-sm bg-light'>
        <h2 className='text-center text-primary mb-4'>{t('Registration Form')}</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label className="text-secondary">{t('Full Name')}</Form.Label>
              <Form.Control 
                type="text" 
                name="custName" 
                placeholder={t("Full Name" )}
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
          {/* Uncomment if needed */}
          {/* <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label className="text-secondary">custDetails</Form.Label>
              <Form.Control 
                type="text" 
                name="custDetails" 
                placeholder="custDetails" 
                onChange={handleChange} 
                required 
              />custDetails
            </Form.Group>
          </Col> */}
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-secondary">{t('Email')}</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                placeholder={t("Email")}
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label className="text-secondary">{t('Age')}</Form.Label>
              <Form.Control 
                type="text" 
                name="age" 
                placeholder={t("Age")} 
                onChange={handleChange} 
                required 
                min="18" 
                max="99" 
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formGender">
              <Form.Label className="text-secondary">{t('Gender')}</Form.Label>
              <Form.Control 
                as="select" 
                name="gender" 
                onChange={handleChange} 
                required
              >
                <option value="">Select Gender</option>
                <option value="male">{t('Male')}</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formCountryCode">
              <Form.Label className="text-secondary">{t("Country Code")}</Form.Label>
              <Form.Control 
                type="number" 
                name="conteryCode" 
                placeholder={t("Country Code" )}
                onChange={handleChange} 
                required 
                min="1" 
                max="999" 
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formMobile">
              <Form.Label className="text-secondary">Contact Number</Form.Label>
              <Form.Control 
                type="tel" 
                name="mobileNo" 
                pattern="[0-9]{10}" 
                placeholder={t("Contact Number" )}
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formAadhaar">
              <Form.Label className="text-secondary">{t('Verification')}</Form.Label>
              <Form.Control 
                type="tel" 
                name="adharNo" 
                pattern="[0-9]{12}" 
                placeholder={t("Verification" )}
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formAddress">
              <Form.Label className="text-secondary">{t('Address')}</Form.Label>
              <Form.Control 
                type="text" 
                name="address" 
                placeholder={t("Address" )}
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUsername">
              <Form.Label className="text-secondary">{t('Create Username')}</Form.Label>
              <Form.Control 
                type="text" 
                name="userName" 
                //placeholder={t("Create Username")} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Label className="text-secondary"> {t('Password')}</Form.Label>
              <Form.Control 
                type="password" 
                name="passWord" 
                placeholder={t(" Password" )}
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegFormComp;
