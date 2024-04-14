import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';
import modalWindowReducer from './modalWindowSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageReducer,
    modalWindow: modalWindowReducer,
  },
});
