import { useTranslation } from 'react-i18next';
import { Card, Col, Image } from 'react-bootstrap';
import signupImg from '../../img/registration.jpg';
import SignupForm from './SignUpForm';

const SignupCard = () => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <Image
            width={200}
            height={200}
            className="rounded-circle"
            alt={t('registration.registrationTitle')}
            src={signupImg}
          />
        </Col>
        <SignupForm />
      </Card.Body>
    </Card>
  );
};

export default SignupCard;
