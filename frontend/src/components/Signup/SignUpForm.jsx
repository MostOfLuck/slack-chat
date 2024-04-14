import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import signUpSchema from '../../validation/signUpSchema';
import LoginButton from '../Buttons/LoginButton';
import { useAuthorization } from '../../hooks/hooks';
import { chatContextRoutes, appRoutes } from '../../routes/index';

const SignupForm = () => {
  const { logIn } = useAuthorization();
  const navigate = useNavigate();
  const [isInvalidAuth, setInvalidAuth] = useState(false);
  const { t } = useTranslation();
  const inputName = useRef(null);

  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputName.current && isInvalidAuth) {
      inputName.current.select();
    }
  }, [isInvalidAuth]);

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirmation: '' },
    validationSchema:
    signUpSchema(
      t('registration.userNameLength'),
      t('registration.passwordLength'),
      t('registration.requiredField'),
      t('registration.passwordMatching'),
    ),
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        setInvalidAuth(false);
        const { data } = await axios.post(chatContextRoutes.signup(), { username, password });
        logIn(data);
        navigate(appRoutes.chatPagePath());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setInvalidAuth(true);
          return;
        }
        toast.error(t('toast.networkError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('registration.registrationTitle')}</h1>
      <fieldset disabled={formik.isSubmitting}>

        <Form.Floating className="mb-3" controlid="floatingInput">
          <Form.Control
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            placeholder={t('registration.userName')}
            value={formik.values.username}
            onChange={(e) => {
              setInvalidAuth(false);
              formik.handleChange(e);
            }}
            isInvalid={isInvalidAuth || (formik.touched.username && formik.errors.username)}
            ref={inputName}
            required
          />
          <Form.Label htmlFor="username">
            {t('registration.userName')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {t('registration.userNameLength')}
          </Form.Control.Feedback>
        </Form.Floating>

        <Form.Floating className="mb-4" controlid="floatingPassword">
          <Form.Control
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            placeholder={t('registration.password')}
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={isInvalidAuth || (formik.touched.password && formik.errors.password)}
            required
          />
          <Form.Label htmlFor="password">
            {t('registration.password')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {t('registration.passwordLength')}
          </Form.Control.Feedback>
        </Form.Floating>
        <Form.Floating className="mb-4" controlid="floatingPassword">
          <Form.Control
            id="passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            autoComplete="password"
            placeholder={t('registration.passwordConfirmation')}
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
            isInvalid={isInvalidAuth
              || (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)}
            isValid={formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation}
            required
          />
          <Form.Label htmlFor="passwordConfirmation">
            {t('registration.passwordConfirmation')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.passwordConfirmation || t('registration.userExist')}
          </Form.Control.Feedback>
        </Form.Floating>
        <LoginButton title={t('registration.registrationBtn')} />
      </fieldset>
    </Form>
  );
};

export default SignupForm;
