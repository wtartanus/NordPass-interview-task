import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import getAuthHeader from '~/utils/getAuthHeader';

interface IUser {
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}

const UserContext = createContext<IUser>({
  deleteData: () => {},
  errorMessage: null,
  isLoading: true,
  username: null,
  email: null,
  id: null,
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [id, setId] = useState<string>(null);

  useEffect(() => {
    (async () => {
      setErrorMessage(null);
      setIsLoading(true);

      try {
        const response = await fetch(getUrl(API.User), {
          headers: getAuthHeader(),
        });

        const data = await response.json();

        setUsername(data?.username);
        setEmail(data?.email);
        setId(data?.id);
      } catch (error) {
        setErrorMessage(error.message);
      }

      setIsLoading(false);
    })();
  }, []);

  const deleteData = () => {
    setErrorMessage(null);
    setIsLoading(false);
    setUsername(null);
    setEmail(null);
    setId(null);
  };

  const value = {
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;