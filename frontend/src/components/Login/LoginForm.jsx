import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from '../Buttons/LoginButton';
import loginSchema from '../../validation/loginSchema';
import { useAuthorization } from '../../hooks/hooks';
import { chatContextRoutes, appRoutes } from '../../routes';

const LoginForm = () => {
  const { logIn } = useAuthorization();
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const [isInvalidUserData, setInvalidUserData] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema(t('login.requiredField')),
    onSubmit: async (values) => {
      setInvalidUserData(false);
      try {
        const { data } = await axios.post(chatContextRoutes.login(), values);
        logIn(data);
        navigate(appRoutes.chatPagePath());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setInvalidUserData(true);
        } else {
          toast.error(t('toast.networkError'));
          rollbar.error('Login', error);
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="title text-center mb-4">{t('login.loginTitle')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Floating className="mb-3" controlid="floatingInput">
          <Form.Control
            name="username"
            autoComplete="username"
            placeholder={t('login.userName')}
            type="text"
            id="username"
            className="form-control"
            onChange={formik.handleChange}
            isInvalid={isInvalidUserData}
            required
          />
          <Form.Label htmlFor="username" className="form-label">
            {t('login.userName')}
          </Form.Label>
        </Form.Floating>
        <Form.Floating className="mb-4" controlid="floatingPassword">
          <Form.Control
            name="password"
            autoComplete="current-password"
            placeholder={t('login.password')}
            type="password"
            id="password"
            className="form-control"
            onChange={formik.handleChange}
            isInvalid={isInvalidUserData}
            required
          />
          <Form.Label htmlFor="password" className="form-label">
            {t('login.password')}
          </Form.Label>
          <Form.Control.Feedback
            type="invalid"
            className="invalid-tooltip invalid-feedback"
            tooltip={isInvalidUserData}
          >
            {t('login.loginError')}
          </Form.Control.Feedback>
        </Form.Floating>
        <Button title={t('login.loginTitle')} />
      </fieldset>
    </Form>
  );
};

export default LoginForm;
