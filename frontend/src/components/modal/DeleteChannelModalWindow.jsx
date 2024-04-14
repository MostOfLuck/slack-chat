import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChatApi } from '../../hooks/hooks';
import { closeModalWindow } from '../../slices/modalWindowSlice';

const DeleteChannelModalWindow = () => {
  const { removeSelectedChannel } = useChatApi();
  const dispatch = useDispatch();
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
  const { t } = useTranslation();

  const handleDeleteChannel = (id) => {
    removeSelectedChannel(id);
    toast.success(t('toast.channelRemoval'));
    dispatch(closeModalWindow());
  };

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow({ type: null, relevantChannel: null }));
  };

  return (
    <Modal show={isModalWindowOpen}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Modal.Title>{t('modal.sure')}</Modal.Title>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleCloseModalWindow}
          >
            {t('modal.cancelBtn')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handleDeleteChannel(relevantChannelId)}
          >
            {t('modal.removeBtn')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModalWindow;
