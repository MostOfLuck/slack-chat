import { useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { openModalWindow } from '../../../slices/modalWindowSlice';
import { setCurrentChannel } from '../../../slices/channelSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    id, name, removable, isActive,
  } = channel;
  const channelName = leoProfanity.clean(name);

  const handleRenameChannel = () => {
    dispatch(openModalWindow({ type: 'rename', relevantChannel: id }));
  };

  const handleRemoveChannel = () => {
    dispatch(openModalWindow({ type: 'remove', relevantChannel: id }));
  };

  const handleClick = () => {
    dispatch(setCurrentChannel(id));
  };

  if (!removable) {
    return (
      <Nav.Item className="w-100">
        <Button
          type="button"
          className="w-100 rounded-0 text-start text-truncate"
          onClick={handleClick}
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
          onClick={handleClick}
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
          <Dropdown.Item onClick={handleRemoveChannel}>
            {t('channel.removeChannel')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleRenameChannel}>
            {t('channel.renameChannel')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
