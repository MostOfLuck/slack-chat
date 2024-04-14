import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { Container, Row } from 'react-bootstrap';
import { useChatApi, useAuthorization } from '../hooks/hooks';

import fetchInitialData from '../context/InitialDataThunk';
import ChannelsPanel from '../components/chat/Channels/ChannelsPanel';
import ChatPanel from '../components/chat/ChatPanel';
import ModalWindow from '../components/modal/ModalWindow';
import { appRoutes } from '../routes';

const Home = () => {
  const { t } = useTranslation();
  const { getChannelsData } = useChatApi();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = useAuthorization();
  const loadingStatus = useSelector((state) => state?.loading?.serverData);

  useEffect(() => {
    dispatch(fetchInitialData(getChannelsData));
  }, [dispatch, getChannelsData]);

  useEffect(() => {
    if (loadingStatus === 'failed') {
      logOut();
      navigate(appRoutes.loginPagePath());
      toast.error(t('toast.networkError'));
      rollbar.error('ChatFailed');
    }

    if (loadingStatus === 'authError') {
      logOut();
      navigate(appRoutes.loginPagePath());
      toast.error(t('toast.authError'));
      rollbar.error('AuthFailed');
    }
  }, [loadingStatus, logOut, navigate, rollbar, t]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsPanel />
        <ChatPanel />
      </Row>
      <ModalWindow />
    </Container>
  );
};

export default Home;
