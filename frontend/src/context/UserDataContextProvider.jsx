import {
  useState,
  createContext,
  useMemo,
  useCallback,
} from 'react';

export const UserDataContext = createContext({});

const UserDataContextProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;
  const [userData, setUserData] = useState(currentUser);

  const logIn = useCallback((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUserData(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUserData(null);
  }, []);

  const memoAuth = useMemo(
    () => ({
      userData,
      logIn,
      logOut,
    }),
    [
      userData,
      logIn,
      logOut,
    ],
  );

  return (
    <UserDataContext.Provider value={memoAuth}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
