import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbars from '../components/Navbar';

function Aboutus() {
  const introduction =
    'Welcome to our automated lunch reservation platform. Our website simplifies the lunch reservation process for employees within our workplace during specific time slots.';

  const details =
    'Our platform allows employees to reserve their lunch within designated time frames. While we currently focus on providing a streamlined reservation system, we aim to offer a variety of meal choices in the future. With our automated system, we ensure a hassle-free and efficient lunch reservation experience for everyone in our workplace.';

  return (
    <div style={{ minHeight: '90vh' }}>
      <Navbars />
      <Container className='my-3'>
        <Row className='justify-content-center'>
          <Col md={8}>
            <h1>About Our Lunch Reservation Platform</h1>
            <p>{introduction}</p>
            <p>{details}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Aboutus;
