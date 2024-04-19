import { useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { openModalWindow } from '../../../slices/modalWindowSlice';

const Channel = ({ isActive, channel, onClick }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id, name, removable } = channel;
  const channelName = leoProfanity.clean(name);

  const handleRenameChannel = (channelId) => {
    dispatch(openModalWindow({ type: 'rename', relevantChannel: channelId }));
  };

  const handleRemoveChannel = (channelId) => {
    dispatch(openModalWindow({ type: 'remove', relevantChannel: channelId }));
  };

  if (!removable) {
    return (
      <Nav.Item className="w-100">
        <Button
          type="button"
          className="w-100 rounded-0 text-start text-truncate"
          onClick={onClick}
          variant={isActive ? 'secondary' : null}
        >
          <span className="me-1">{t('channel.prefix')}</span>
          {name}
        </Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          type="button"
          className="w-100 rounded-0 text-start text-truncate"
          onClick={onClick}
          variant={isActive ? 'secondary' : null}
        >
          <span className="me-1">{t('channel.prefix')}</span>
          {channelName}
        </Button>
        <Dropdown.Toggle
          split
          variant={isActive ? 'secondary' : null}
          type="button"
          id="dropdown-split-basic"
          className="border-0"
        >
          <span className="visually-hidden">{t('channel.controlChannel')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleRemoveChannel(id)}>
            {t('channel.removeChannel')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleRenameChannel(id)}>
            {t('channel.renameChannel')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
