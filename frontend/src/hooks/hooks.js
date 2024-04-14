import { useContext } from 'react';

import { ChatContext } from '../context/ChatContext';
import { UserDataContext } from '../context/UserDataContextProvider';

export const useAuthorization = () => useContext(UserDataContext);
export const useChatApi = () => useContext(ChatContext);
