import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useParams,useNavigate } from "react-router-dom";

function Booking() {
  const [departureData, setDepartureData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [paxData, setPaxData] = useState(0);
  const [sumData, setSumData] = useState({});
  const [paxAllData, setPaxAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingPost, setBookingPost] = useState(null);
  const [isPayDisabled, setIsPayDisabled] = useState(false); // State to disable Pay button
  const [isPrintDisabled, setIsPrintDisabled] = useState(true); // State to enable Print button
  const navigate = useNavigate();

  const { pkgId } = useParams();
  const custId = sessionStorage.getItem("uid");
  const bookid = sessionStorage.getItem("bookid");
  const pax_count = sessionStorage.getItem("pass_count");
  const depart_id = sessionStorage.getItem("did");
  const totalofpax = sessionStorage.getItem("tcost");

  // Ensure `totalofpax` and `sumData` are valid numbers
  const tax = (parseFloat(sumData.taxes || 0) + parseFloat(totalofpax || 0) + parseFloat(sumData.tourAmount || 0)) * 0.1;
  const t = (parseFloat(sumData.tourAmount || 0) + parseFloat(totalofpax || 0)) + tax;

  useEffect(() => {
    async function fetchDepartureData() {
      try {
        const response = await fetch(`http://localhost:8080/api/dateMaster/${depart_id}`);
        const data = await response.json();
        setDepartureData(data);
        console.log("date object:", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching departure data:", error);
      }
    }

    async function fetchCustomerData() {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${custId}`);
        const data = await response.json();
        setCustomerData(data);
        console.log("cust object:", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }

    async function fetchBookingData() {
      try {
        const response = await fetch(`http://localhost:8080/api/booking/${bookid}`);
        const data = await response.json();
        setSumData(data);
        console.log("bid object:", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPaxData() {
      try {
        const response = await fetch(`http://localhost:8080/api/passengers/booking/${bookid}`);
        const data = await response.json();
        setPaxAllData(data);
        console.log("passenger object:", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    }

    fetchDepartureData();
    fetchCustomerData();
    fetchBookingData();
    fetchPaxData();
    setPaxData(pax_count);
  }, [depart_id, custId, bookid, pax_count]);

  const printDocument = () => {
    const doc = new jsPDF();
    const pdfTable = document.getElementById("divToPrint");
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = {
      content: [
        { text: "BOOKING DETAILS", fontSize: 18, bold: true },
        { text: `Purchased Date: ${new Date().toDateString()}`, fontSize: 12 },
        html,
      ],
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  };

  const totalamt = (parseFloat(sumData.tourAmount || 0) + parseFloat(totalofpax || 0)) * 1.18; // Calculate total with 18% tax
  const Taxes = 10; // You should calculate this based on actual values

  const PrintData = () => {
    setBookingPost({
      bookingDate: new Date().toISOString().substr(0, 10),
      numberOfPassengers: +pax_count,
      tourAmount: sumData.tourAmount || 0,
      taxes: Taxes,
      totalAmount: totalamt,
      pkgId: +pkgId,
      custId: +custId,
    });
  };

  const alertfunc=()=>{
    alert("Thank You!!! Your Tour is Booked");
        setIsPayDisabled(true);  // Disable Pay button after successful booking
        setIsPrintDisabled(false);
  };
  const goHome=()=>{
    
    navigate("/");  // Disable Pay button after successful booking
        
  };

  const PostData = async () => {
    if (!bookingPost) {
      console.error("No booking data to post.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/Booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPost),
      });

      if (response.ok) {
        console.log("Customer booked their tour successfully!");
        alert("Thank You!!! Your Tour is Booked");
        setIsPayDisabled(true);  // Disable Pay button after successful booking
        setIsPrintDisabled(false); // Enable Print button after successful booking
      } else {
        console.error("Customer booking failed.");
      }
    } catch (error) {
      console.error("An error occurred while booking the customer:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div align="center">
      <div id="divToPrint" style={{ padding: "20px" }}>
        <h1>Invoice</h1>

        <h3>Departure Details</h3>
        <p>Departure Date: {departureData.departDate}</p>
        <p>End Date: {departureData.endDate}</p>

        <h3>Customer Details</h3>
        <p> Name: {customerData.custName}</p>
        <p> Age: {customerData.age}</p>
        <p> Gender: {customerData.gender}</p>
        <p> Mobile Number: {customerData.mobileNumber}</p>
        <p> Email: {customerData.email}</p>
        <p> Aadhar Number: {customerData.adharNo}</p>

        <div>
          <h3>Passenger Details</h3>
          <p>Number Of Passengers: {paxData-1}</p>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Passenger Name</th>
                <th>Passenger Birthdate</th>
                <th>Passenger Type</th>
                <th>Passenger Amount</th>
              </tr>
            </thead>
            <tbody>
              {paxAllData.map((passenger, index) => (
                <tr key={passenger.paxId || index}>
                  <td>{passenger.paxName}</td>
                  <td>{passenger.paxBirthdate.split('T')[0]}</td>
                  <td>{passenger.paxType}</td>
                  <td>{passenger.paxAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="booking-card">
          <h2>Booking Details</h2>
          <table className="booking-table" style={{ width: "100%", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td>Booking Date:</td>
                <td>{sumData.bookingDate}</td>
              </tr>
              <tr>
                <td>Number of Passengers:</td>
                <td>{sumData.noOfPax}</td>
              </tr>
              <tr>
                <td>Tour Amount:</td>
                <td>{sumData.tourAmount}</td>
              </tr>
              <tr>
                <td>Extra Passenger Cost:</td>
                <td>{totalofpax}</td>
              </tr>
              <tr>
                <td>Taxes (10%):</td>
                <td>{tax}</td>
              </tr>
              <tr>
                <td>Total Amount:</td>
                <td>{t}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        className="print-button"
        onClick={alertfunc}
        disabled={isPayDisabled} // Disable Pay button if booking is done
        style={{
          backgroundColor: isPayDisabled ? "#95a5a6" : "#3498db", // Change color if disabled
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          margin: "10px",
          cursor: isPayDisabled ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
      >
        Pay
      </button>

      <button
        className="print-button"
        onClick={printDocument}
        disabled={isPrintDisabled} // Disable Print button if booking is not done
        style={{
          backgroundColor: isPrintDisabled ? "#95a5a6" : "#2ecc71", // Change color if disabled
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          margin: "10px",
          cursor: isPrintDisabled ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
      >
        Print PDF
      </button>
      <button
        className="print-button"
        onClick={goHome}
         // Disable Pay button if booking is done
        style={{
           // Change color if disabled
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          margin: "10px",
         
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
      >
        Go To Home
      </button>
    </div>
  );
}

export default Booking;
