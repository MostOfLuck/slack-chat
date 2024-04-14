import { Col, Container, Row } from 'react-bootstrap';
import SignupCard from '../components/Signup/SignUpCard';

const Signup = () => (
  <Container className="h-100" fluid>
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <SignupCard />
      </Col>
    </Row>
  </Container>
);

export default Signup;
