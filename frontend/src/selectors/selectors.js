import { messagesAdapter } from '../slices/messageSlice';
import { channelsAdapter } from '../slices/channelSlice';
import { modalWindowAdapter } from '../slices/modalWindowSlice';

export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export const currentChannel = (state) => (
  channelsSelector.selectById(state, state.channels.currentChannelId));
export const channelsNames = (state) => (
  channelsSelector.selectAll(state).map((channel) => channel.name));
export const modalWindowSelector = modalWindowAdapter.getSelectors((state) => state.modalWindow);
