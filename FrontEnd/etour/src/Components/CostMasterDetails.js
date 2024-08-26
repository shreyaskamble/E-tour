import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import './CostMasterDetails.css';

function CostMasterDetails() {
    const { catMasterId } = useParams();
    const departDate = sessionStorage.getItem("departdate");

    let navigate = useNavigate();
    const [costMaster, setCostMaster] = useState({});
    const [persons, setPersons] = useState({
        adults: 1,
        childWithBed: 0,
        childWithoutBed: 0
    });
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        console.log(departDate);
        fetch("https://localhost:8080/cost/bydate/" + departDate)
            .then(res => res.json())
            .then(data => {
                setCostMaster(data);
                updateTotalCost({
                    ...persons,
                    adults: 1 // Ensure initial calculation starts with 1 adult
                });
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching cost master details:', error);
            });
    }, [departDate]);

    const updateTotalCost = (newPersons) => {
        const { adults, childWithBed, childWithoutBed } = newPersons;
        const total = 
            costMaster.cost1 + 
            (adults - 1) * costMaster.extraPersonCost + 
            childWithBed * costMaster.childWithBed + 
            childWithoutBed * costMaster.childWithoutBed;
        setTotalCost(total);
    };

    const handleAddPerson = (type) => {
        setPersons((prevPersons) => {
            const newPersons = { ...prevPersons, [type]: prevPersons[type] + 1 };
            updateTotalCost(newPersons);
            return newPersons;
        });
    };

    const handleRemovePerson = (type) => {
        setPersons((prevPersons) => {
            if (prevPersons[type] > 0) {
                const newPersons = { ...prevPersons, [type]: prevPersons[type] - 1 };
                updateTotalCost(newPersons);
                return newPersons;
            }
            return prevPersons;
        });
    };

    return (
        <Container className="cost-master-container">
            <h1 className="centered-heading" style={{ color: 'red' }}>Cost Details</h1>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="cost-card">
                        <Card.Body>
                            <Card.Title className="card-title">Cost Details</Card.Title>
                            <div className="table-container">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Field</th>
                                            <th>Value</th>
                                        </tr>
                                        <tr>
                                            <td>Base Cost</td>
                                            <td>Rs.{costMaster.cost1}</td>
                                        </tr>
                                        <tr>
                                            <td>Single Person Cost</td>
                                            <td>Rs.{costMaster.singlePersonCost}</td>
                                        </tr>
                                        <tr>
                                            <td>Extra Person Cost</td>
                                            <td>Rs.{costMaster.extraPersonCost}</td>
                                        </tr>
                                        <tr>
                                            <td>Child With Bed</td>
                                            <td>Rs.{costMaster.childWithBed}</td>
                                        </tr>
                                        <tr>
                                            <td>Child Without Bed</td>
                                            <td>Rs.{costMaster.childWithoutBed}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Card className="cost-card">
                        <Card.Body>
                            <Card.Title className="card-title">Cost Calculation</Card.Title>
                            <div className="table-container">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Number of Adults</td>
                                            <td>
                                                <ButtonGroup aria-label="Number of Adults">
                                                    <Button variant="secondary" onClick={() => handleRemovePerson('adults')}>-</Button>
                                                    <Button variant="secondary" disabled>{persons.adults}</Button>
                                                    <Button variant="secondary" onClick={() => handleAddPerson('adults')}>+</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Child With Bed</td>
                                            <td>
                                                <ButtonGroup aria-label="Child With Bed">
                                                    <Button variant="secondary" onClick={() => handleRemovePerson('childWithBed')}>-</Button>
                                                    <Button variant="secondary" disabled>{persons.childWithBed}</Button>
                                                    <Button variant="secondary" onClick={() => handleAddPerson('childWithBed')}>+</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Child Without Bed</td>
                                            <td>
                                                <ButtonGroup aria-label="Child Without Bed">
                                                    <Button variant="secondary" onClick={() => handleRemovePerson('childWithoutBed')}>-</Button>
                                                    <Button variant="secondary" disabled>{persons.childWithoutBed}</Button>
                                                    <Button variant="secondary" onClick={() => handleAddPerson('childWithoutBed')}>+</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Card className="cost-card">
                        <Card.Body>
                            <Card.Title className="card-title">Cost Breakdown</Card.Title>
                            <div className="table-container">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Description</th>
                                            <th>Cost</th>
                                        </tr>
                                        <tr>
                                            <td>Base Cost</td>
                                            <td>Rs.{costMaster.cost1}</td>
                                        </tr>
                                        <tr>
                                            <td>Additional Cost for {persons.adults - 1} Extra Adults</td>
                                            <td>Rs.{(persons.adults - 1) * costMaster.extraPersonCost}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost for {persons.childWithBed} Children With Bed</td>
                                            <td>Rs.{persons.childWithBed * costMaster.childWithBed}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost for {persons.childWithoutBed} Children Without Bed</td>
                                            <td>Rs.{persons.childWithoutBed * costMaster.childWithoutBed}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Total Cost</strong></td>
                                            <td><strong>Rs.{totalCost}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Button variant="primary" onClick={() => navigate(`/bypkgMasterId/${sessionStorage.getItem("catid")}`)}>
                                Confirm Cost and Proceed
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CostMasterDetails;
