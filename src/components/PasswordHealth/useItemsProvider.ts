import {useEffect, useState} from 'react';
import getUserItems, {IItem} from '../../services/getUserItems';

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
      setErrorMessage(error.message);
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
