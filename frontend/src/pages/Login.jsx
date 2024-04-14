import { Container, Row } from 'react-bootstrap';
import LoginCard from '../components/Login/LoginCard';

const Login = () => (
  <Container className="h-100" fluid>
    <Row className="justify-content-center align-content-center h-100">
      <LoginCard />
    </Row>
  </Container>
);

export default Login;
