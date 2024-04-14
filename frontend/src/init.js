import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import LeoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import ChatContextProvider from './context/ChatContext';
import store from './slices';
import App from './components/App';
import UserDataContextProvider from './context/UserDataContextProvider';
import resources from './locales/index.js';
import { addMessage } from './slices/messageSlice';
import { addChannel, deleteChannel, renameChannel } from './slices/channelSlice';
import { appRoutes } from './routes';

const defaultLanguage = 'ru';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      debug: true,
      resources,
      fallbackLng: defaultLanguage,
      interpolation: {
        escapeValue: false,
      },
    });

  const socket = io(appRoutes.chatPagePath(), { autoConnect: true });

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    store.dispatch(deleteChannel(channel.id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(renameChannel({ id, changes: { name } }));
  });

  const profanityFilter = LeoProfanity;
  profanityFilter.add(profanityFilter.getDictionary(defaultLanguage));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    payload: {
      environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <UserDataContextProvider>
            <ChatContextProvider socket={socket}>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </ChatContextProvider>
          </UserDataContextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default init;
