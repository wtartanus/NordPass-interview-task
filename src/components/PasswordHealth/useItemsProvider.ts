import {useEffect, useState} from 'react';
import getUserItems, {IItem} from '../../services/getUserItems';
import UnauthorizedError from '../../errors/unauthorized';
import {Routes} from '~/constants';
import {useHistory} from 'react-router-dom';

const userItemsProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [items, setItems] = useState<Array<IItem>>([]);
  const {push} = useHistory();

  const refreshUserItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setItems(userItems);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof UnauthorizedError) {
        localStorage.removeItem('token');
        push(Routes.Login);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    refreshUserItems();
  }, []);

  return {
    isLoading,
    errorMessage,
    items,
    refreshUserItems,
  }
};

export default userItemsProvider;
