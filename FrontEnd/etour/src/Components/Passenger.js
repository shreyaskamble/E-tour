import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Table } from 'react-bootstrap';
import './PassengerDetail.css';
import { useNavigate, useParams } from 'react-router-dom';

function PassengerDetail() {
  const [inputValue, setInputValue] = useState('');
  const [datevalue, setDateValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [cost, setCost] = useState([]);
  const [bookingId, setBookingId] = useState(null); // State for booking ID
  const { catid } = useParams();
  const pkgId = sessionStorage.getItem("pkgid");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate > today) {
      alert("Birth date cannot be greater than today's date.");
    } else {
      setDateValue(selectedDate);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getCost = () => {
    fetch("http://localhost:8080/api/cost/subCatId/" + catid)
      .then(response => response.json())
      .then(data => {
        setCost(data[0]);
        setSelectedOption(data?.key || (cost.singlePrsnCost));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getCost();
  }, []);

  const addPassenger = () => {
    const passenger = {
      passengerName: inputValue,
      birthdate: datevalue,
      passengerType: selectedOption,
      passengerAmount: cost[selectedOption]
    };

    setPassengers([...passengers, passenger]);
    setInputValue('');
    setDateValue('');
    setSelectedOption('');
  };

  const createBooking = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgId, custId: sessionStorage.getItem("uid") })
      });
      if (response.ok) {
        const result = await response.json();
        setBookingId(result.bookingId); // Store the booking ID
      } else {
        console.log("Booking creation failed.");
      }
    } catch (error) {
      console.error("An error occurred while creating the booking:", error);
    }
  };

  const postPassengers = async () => {
    try {
      for (const passenger of passengers) {
        const response = await fetch("http://localhost:8080/api/passengers", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...passenger, bookingId })
        });
        if (!response.ok) {
          console.log("Passenger booking failed.");
        }
      }
      console.log("All passengers booked successfully!");
    } catch (error) {
      console.error("An error occurred while registering the passengers:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createBooking(); // Create booking first
    if (bookingId) {
      await postPassengers(); // Then post passengers
      navigate(`/bybooking/${pkgId}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: "center" }}>
      <div className="user-input-container">
        <h2 className="text-center">Passenger Details 📄</h2>
        <Form onSubmit={handleSubmit} className="custom-form">
          <Form.Group controlId="inputValue">
            <Form.Label className="custom-label">Passenger Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name..."
              value={inputValue}
              onChange={handleInputChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="birthdate">
            <Form.Label className="custom-label">Birth Date:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Birth Date..."
              value={datevalue}
              onChange={handleDateChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="radioGroup">
            <Form.Label className="custom-label">Passenger Type:</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label={`Single Person Cost: ₹${cost.singlePrsnCost}`}
                name="radioGroup"
                value="singlePrsnCost"
                checked={selectedOption === 'singlePrsnCost'}
                onChange={handleRadioChange}
                className="radio-input"
              />
              <Form.Check
                type="radio"
                label={`Extra Person Cost: ₹${cost.extraPrsnCost}`}
                name="radioGroup"
                value="extraPrsnCost"
                checked={selectedOption === 'extraPrsnCost'}
                onChange={handleRadioChange}
                className="radio-input"
              />
              <Form.Check
                type="radio"
                label={`Child with Bed: ₹${cost.childWithBed}`}
                name="radioGroup"
                value="childWithBed"
                checked={selectedOption === 'childWithBed'}
                onChange={handleRadioChange}
                className="radio-input"
              />
              <Form.Check
                type="radio"
                label={`Child without Bed: ₹${cost.childWithoutBed}`}
                name="radioGroup"
                value="childWithoutBed"
                checked={selectedOption === 'childWithoutBed'}
                onChange={handleRadioChange}
                className="radio-input"
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
          <Button
            variant="secondary"
            type="button"
            className="submit-button"
            onClick={addPassenger}
          >
            Add Passenger
          </Button>
          <Button
            variant="info"
            type="button"
            className="submit-button"
            onClick={() => setShowTable(!showTable)}
          >
            Show Table
          </Button>
        </Form>

        {showTable && (
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.passengerName}</td>
                  <td>{passenger.birthdate}</td>
                  <td>{passenger.passengerType}</td>
                  <td>₹{passenger.passengerAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Button variant="primary" onClick={() => navigate(`/bybooking/${pkgId}`)} className="submit-button">
          Book My Tour
        </Button>
      </div>
    </div>
  );
}

export default PassengerDetail;
