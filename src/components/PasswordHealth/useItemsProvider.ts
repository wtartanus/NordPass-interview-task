import {useEffect, useState} from 'react';
import getUserItems, {IItem} from '../../services/getUserItems';
import UnauthorizedError from '../../errors/unauthorized';
import {Routes} from '~/constants';
import {useHistory} from 'react-router-dom';

const userItemsProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [items, setItems] = useState<Array<IItem>>([]);

  const refreshUserItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setItems(userItems);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        localStorage.removeItem('token');
        const {push} = useHistory();
        push(Routes.Login);
        
      } else {
      setErrorMessage(error.message);
      }
    }

    setIsLoading(false);
  }

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
