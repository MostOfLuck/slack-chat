import { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addChannel, setCurrentChannel } from '../slices/channelSlice';
import { chatContextRoutes } from '../routes';

export const ChatContext = createContext({});

const ChatContextProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 3000;

  const addNewMessage = useCallback(
    async (message) => {
      await socket
        .timeout(timeout)
        .emit('newMessage', message);
    },
    [socket],
  );

  const addNewChannel = useCallback(
    async (channel) => {
      const { data } = await socket
        .timeout(timeout)
        .emitWithAck('newChannel', channel);
      dispatch(addChannel(data));
      dispatch(setCurrentChannel(data.id));
    },
    [socket, dispatch],
  );

  const removeSelectedChannel = useCallback(
    async (id) => {
      await socket
        .timeout(timeout)
        .emit('removeChannel', { id });
    },
    [socket],
  );

  const renameSelectedChannel = useCallback(
    async ({ id, name }) => {
      await socket
        .timeout(timeout)
        .emit('renameChannel', { id, name });
    },
    [socket],
  );

  const getChannelsData = useCallback(
    async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(chatContextRoutes.data(), { headers: { Authorization: `Bearer ${user.token}` } });
      return response;
    },
    [],
  );

  const memoAuth = useMemo(
    () => ({
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getChannelsData,
    }),
    [
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getChannelsData,
    ],
  );

  return (
    <ChatContext.Provider value={memoAuth}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
