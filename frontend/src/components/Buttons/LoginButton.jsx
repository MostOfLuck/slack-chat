import { Button } from 'react-bootstrap';

const LoginButton = ({ title }) => (
  <Button
    type="submit"
    variant="outline-primary"
    className="w-100 mb-3"
  >
    {title}
  </Button>
);

export default LoginButton;
