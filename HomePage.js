import React from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='mt-0'>
      <Card style={{ width: '100%', maxWidth: '800px', backgroundColor: '#fc8019', color: 'white', borderRadius: '15px', padding: '20px' }}>
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center mb-4">
              <img src="/swiggy-logo.png" alt="Swiggy Logo" style={{ height: '100px' }} />
              <h1 className="mt-3">Order food. Discover best restaurants. By QuickBite!</h1>
              <Link to="/dishes" className="text-decoration-none text-white">
                <Button color="light" className="mt-3 btn-orange" style={{ borderRadius: '15px', padding: '10px 20px' ,backgroundColor:'#ffffff',fontWeight: 'bolder' }}>
                  Order Now  
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4} className="mb-4">
              <Link to="/dishes" className="text-decoration-none text-white">
                <Card className="h-100 bg-light text-center" style={{ borderRadius: '15px' }}>
                  <CardBody>
                    <h5 className="card-title">FOOD DELIVERY FROM RESTAURANTS</h5>
                    <p className="card-text">UPTO 60% OFF</p>
                  </CardBody>
                  <CardFooter>
                    <img src="/food-delivery.png" alt="Food Delivery" style={{ height: '50px' }} />
                  </CardFooter>
                </Card>
              </Link>
            </Col>
            <Col xs={12} md={6} lg={4} className="mb-4">
              <Link to="/dishes" className="text-decoration-none text-white">
                <Card className="h-100 bg-light text-center" style={{ borderRadius: '15px' }}>
                  <CardBody>
                    <h5 className="card-title">DINEOUT EAT OUT & SAVE MORE</h5>
                    <p className="card-text">UPTO 50% OFF</p>
                  </CardBody>
                  <CardFooter>
                    <img src="/dine-in.png" alt="Dineout" style={{ height: '50px' }} />
                  </CardFooter>
                </Card>
              </Link>
            </Col>
            <Col xs={12} md={6} lg={4} className="mb-4">
              <Link to="/dishes" className="text-decoration-none text-white">
                <Card className="h-100 bg-light text-center" style={{ borderRadius: '15px' }}>
                  <CardBody>
                    <h5 className="card-title">GENIE PICK-UP & DROP</h5>
                    <p>15 minutes delivery</p>
                  </CardBody>
                  <CardFooter>
                    <img src="/Genie.avif" alt="Genie" style={{ height: '50px' }} />
                  </CardFooter>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Home;