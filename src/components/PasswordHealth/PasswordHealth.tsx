import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import {Route, Switch} from "react-router-dom";
import {Routes} from '~/constants';
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import { useUserContext } from '../UserContext';

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items,
    isLoading,
    errorMessage,
    refreshUserItems
  } = useItemsProvider();

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>
  }

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>
  }

  return (
    <div className="container">
      <Header items={items.filter(item => itemHasWeakPassword(item) || itemHasReusedPassword(item, items) || itemHasOldPassword(item))} username={username} />
      <Filter items={items}/>
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} refreshUserItems={refreshUserItems} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={items.filter(itemHasWeakPassword)} refreshUserItems={refreshUserItems} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={items.filter((item) => itemHasReusedPassword(item, items))} refreshUserItems={refreshUserItems}/>
        </Route>
        <Route path={Routes.Old}>
          <List items={items.filter((item) => itemHasOldPassword(item))} refreshUserItems={refreshUserItems}/>
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
