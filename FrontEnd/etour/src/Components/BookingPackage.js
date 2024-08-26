import React, { useState, useEffect } from "react";
import { Button, Form, Col, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import './BookingPage.css';

const BookingPackage = () => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [cost, setCost] = useState({});
  const [bookid, setBookid] = useState(null); // State for booking ID
  const [totalCost1, setTotalCost1] = useState(0);
  const [itr, setItr] = useState([]); // Initialize as 0

  const { catid } = useParams();
  const navigate = useNavigate();
  const c_id = sessionStorage.getItem("uid");
  sessionStorage.setItem("pass_count",passengers.length);
  sessionStorage.setItem("bookid",bookid);

  useEffect(() => {
    // Fetch category data from the API when the component mounts
    fetch(`http://localhost:8080/api/itineraries/subCategory/${catid}`)
      .then(res => res.json())
      .then(result =>{ setItr(result);
      console.log(result);})
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    getCost();
  }, [catid]);

  useEffect(() => {
    if (bookid) {
      calculate(); // Calculate total cost whenever bookid is updated
    }
  }, [passengers, cost, bookid]);

  const getCost = () => {
    fetch(`http://localhost:8080/api/cost/subCatId/${catid}`)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.length > 0) {
          setCost(result[0]); // Set the cost to the first object in the array
          setSelectedOption("singlePrsnCost"); // Set the default selected option
          console.log("Costs fetched:", result[0]);
        } else {
          console.error("No cost data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate > today) {
      alert("Birth date cannot be greater than today's date.");
    } else {
      setDateValue(selectedDate);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addPassenger = () => {
    const passenger = {
      paxName: inputValue,
      paxBirthdate: dateValue,
      paxType: selectedOption,
      paxAmount: cost[selectedOption] || 0, // Use 0 if cost[selectedOption] is undefined
      bookingHeader: {
        bookingId: bookid,
      },
    };
    setPassengers((prevPassengers) => [...prevPassengers, passenger]);
    setInputValue("");
    setDateValue("");
    setSelectedOption("singlePrsnCost");
  };

  const calculate = () => {
    let totalCost = 0;
    let singlePersonCostRemoved = false; // Flag to track if the single person cost has been removed
  
    passengers.forEach((passenger) => {
      totalCost += cost[passenger.paxType] || 0;
    });
  
    // passengers.forEach((passenger) => {
    //   if (passenger.paxType === 'singlePrsnCost' && !singlePersonCostRemoved) {
    //     totalCost -= cost[passenger.paxType] || 0;
    //     singlePersonCostRemoved = true; // Set the flag to true after removing the cost
    //   }
    // });
  
    setTotalCost1(totalCost);
    console.log("Total calculated cost:", totalCost);
    sessionStorage.setItem("tcost",totalCost);
  };

  const handleCreateBooking = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingDate: new Date().toISOString().split("T")[0],
          noOfPax: 0,
          taxes: 0,
          totalAmount: 0,
          tourAmount: 0,
          customerMaster: {
            custId: c_id,
          },
        }),
      });

      const data = await response.json();
      setBookid(data.bookingId);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleAddPassenger = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    addPassenger(); // Add the passenger details to the passengers array

    try {
      const response = await fetch("http://localhost:8080/api/passengers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passengers),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding passenger:", error);
    }

    await handleSubmit();
  };

  const handleSubmit = async () => {
    await calculate(); // Ensure totalCost1 is calculated before proceeding

    if (bookid) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/booking/${bookid}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId: bookid,
              bookingDate: new Date().toISOString().split("T")[0],
              customerMaster: { custId: c_id },
              noOfPax: passengers.length,
              tourAmount: cost.cost,
              taxes: (cost.cost + totalCost1) * 0.1,
              totalAmount: cost.cost + totalCost1 + (cost.cost + totalCost1) * 0.1,
            }),
          }
        );
        if (response.ok) {
          navigate("/success-page");
        }
      } catch (error) {
        console.error("Error updating booking:", error);
      }
    }
  };
  const subCatName = itr.length > 0 && itr[0].subCategoryMaster ? itr[0].subCategoryMaster.subCat_name : "No subCategory name available";
  const description = itr.length > 0 && itr[0].subCategoryMaster ? itr[0].subCategoryMaster.description : "No description available";
  const imgpath = itr.length > 0 && itr[0].subCategoryMaster ? itr[0].subCategoryMaster.subCatImagePath : "/notfound.png";
  return (
    <div>
      {!bookid ? (<>
        <div className="itinerary-container">
      <h2>Tour Itinerary</h2>
      <div className="photo-container">
        <h3>
          <span className="red-text">Tour Name : </span>
          {subCatName}
        </h3>
        <img
          src={imgpath}
          alt="tour img not Found"
          className="itinerary-photo"
        />
        <h3>
          <span className="red-text">Description of Tour : </span>
          {description}
        </h3>
        {itr.map((day, index) => (
          <h3 key={index}>
            {day.itrDtl}
          </h3>
        ))}
      </div>
    </div>
    {/* <div className="button-container">
      <button onClick={handleCreateBooking} className="center-button">
        Create Booking
      </button>
    </div> */}
      </>
        
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="user-input-container">
            <h2 className="text-center">Passenger Details 📄</h2>
            <Form onSubmit={handleAddPassenger} className="custom-form">
              <Form.Group controlId="inputValue_1">
                <Form.Label className="custom-label">Passenger Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="birthdate_1">
                <Form.Label className="custom-label">Birth Date:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Birth Date..."
                  value={dateValue}
                  onChange={handleDateChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="radioGroup_1">
                <Form.Label className="custom-label">Passenger Type:</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label={`Single Person Cost: ₹${cost.singlePrsnCost}`}
                    name="radioGroup_1"
                    value="singlePrsnCost"
                    checked={selectedOption === "singlePrsnCost"}
                    onChange={handleRadioChange}
                    className="radio-input"
                  />
                  <Form.Check
                    type="radio"
                    label={`Extra Person Cost: ₹${cost.extraPrsnCost}`}
                    name="radioGroup_1"
                    value="extraPrsnCost"
                    checked={selectedOption === "extraPrsnCost"}
                    onChange={handleRadioChange}
                    className="radio-input"
                  />
                  <Form.Check
                    type="radio"
                    label={`Child with Bed: ₹${cost.childWithBed}`}
                    name="radioGroup_1"
                    value="childWithBed"
                    checked={selectedOption === "childWithBed"}
                    onChange={handleRadioChange}
                    className="radio-input"
                  />
                  <Form.Check
                    type="radio"
                    label={`Child without Bed: ₹${cost.childWithoutBed}`}
                    name="radioGroup_1"
                    value="childWithoutBed"
                    checked={selectedOption === "childWithoutBed"}
                    onChange={handleRadioChange}
                    className="radio-input"
                  />
                </Col>
              </Form.Group>
              <Button style={{ float: "right", marginRight: "20px" }}
                variant="secondary"
                type="button"
                className="submit-button"
                onClick={addPassenger}
              >
                Add Passenger
              </Button>
              <Button
              style={{ float: "left", marginLeft: "20px" }}
               variant="primary" type="submit" className="submit-button">
                Submit
              </Button>
              
              {/* <Button
                variant="info"
                type="button"
                className="submit-button"
                onClick={() => setShowTable(!showTable)}
              >
                Show Table
              </Button> */}
            </Form>

            { (
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
                      <td>{passenger.paxName}</td>
                      <td>{passenger.paxBirthdate}</td>
                      <td>{passenger.paxType}</td>
                      <td>{passenger.paxAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            
            <h3>Total Cost: ₹{totalCost1}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPackage;
