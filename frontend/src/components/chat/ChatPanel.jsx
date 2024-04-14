import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import MessageForm from './Messages/MessageForm';
import MessageBox from './Messages/MessageBox';
import { messagesSelector, currentChannel } from '../../selectors/selectors';

const ChatPanel = () => {
  const { t } = useTranslation();

  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelData = useSelector(currentChannel);
  const currentChannelName = currentChannelData?.name;
  const currentChannelMessages = messages.filter(
    (message) => message.сhannelId === currentChannelData?.id,
  );
  const currentChannelMessagesCount = currentChannelMessages.length;
  const channelName = leoProfanity.clean(currentChannelName);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {t('channel.prefix')}
              {channelName}
            </b>
          </p>
          <span className="message-count">
            {t('message.messagesCount', { count: currentChannelMessagesCount })}
          </span>
        </div>

        <MessageBox currentChannelMessages={currentChannelMessages} />
        <MessageForm />
      </div>
    </Col>
  );
};

export default ChatPanel;
