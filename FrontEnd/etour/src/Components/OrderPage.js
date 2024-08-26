import React, { useEffect, useState } from 'react';
import { Button, Spinner, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePlaceOrder = async () => {
    const customermail = sessionStorage.getItem('pid');
   

    

    try {
        const response = await fetch('http://localhost:8080/sendMailWithPDFAttachment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({ email: customermail })
        });

        // Check if the response is successful (status code 2xx)
        if (response.ok) {
            const contentType = response.headers.get('content-type');

            // Check if the response is JSON
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Email sent successfully:', data);
                setIsEmailSent(true);

                // Redirect to home page after 1 second
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                console.log('Email sent successfully');
                setIsEmailSent(true);

                // Redirect to home page after 1 second
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
        } else {
            // Handle non-successful response
            console.error('Error sending email. Status:', response.status);
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h2 className="text-center mb-4">Order Page</h2>

                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Card>
                            <Card.Body>
                                {isEmailSent && (
                                    <Alert variant="success" onClose={() => setIsEmailSent(false)} dismissible>
                                        Email with invoice details sent successfully!
                                    </Alert>
                                )}

                                <Card.Text>
                                    Thank you for your order! Your order details are being processed.
                                </Card.Text>

                                <Button variant="primary" onClick={handlePlaceOrder}>
                                    Send Email with Invoice Details
                                </Button>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default OrderPage;