import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useChatApi } from '../../hooks/hooks';
import channelNameShema from '../../validation/channelNameSchema';
import { closeModalWindow } from '../../slices/modalWindowSlice';
import { channelsNames } from '../../selectors/selectors';

const AddModalWindow = () => {
  const { addNewChannel } = useChatApi();
  const rollbar = useRollbar();
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsNamesList = useSelector(channelsNames);
  const refModalInput = useRef(null);

  useEffect(() => {
    if (refModalInput.current) {
      refModalInput.current.focus();
    }
  }, []);

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema:
    channelNameShema(
      channelsNamesList,
      t('modal.channelNameLength'),
      t('modal.requiredField'),
      t('modal.uniqueNameError'),
    ),
    onSubmit: async (values) => {
      const filteredName = leoProfanity.clean(values.name);
      try {
        await addNewChannel({ name: filteredName });
        handleCloseModalWindow();
        toast.success(t('toast.channelCreation'));
      } catch (error) {
        toast.error(t('toast.networkError'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  return (
    <Modal show={isModalWindowOpen} onHide={handleCloseModalWindow}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.createChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              className="mb-2"
              ref={refModalInput}
              name="name"
              aria-label={t('modal.channelNameInput')}
              onChange={formik.handleChange}
              isInvalid={(formik.errors.name && formik.touched.name)}
              value={formik.values.name}
            />
            <Form.Label visuallyHidden>
              {t('modal.channelNameInput')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleCloseModalWindow}
              >
                {t('modal.cancelBtn')}
              </Button>
              <Button
                variant="info"
                type="submit"
                onClick={formik.handleSubmit}
              >
                {t('modal.sendBtn')}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModalWindow;
