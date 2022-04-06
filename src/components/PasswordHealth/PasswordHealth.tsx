import {Route, Switch} from "react-router-dom";

import {Routes} from '~/constants';
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasOldPassword from "~/utils/itemHasOldPassword";

import { useUserContext } from '../UserContext';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import LoadingScreen from '../LoadingScreen';
import useItemsProvider from './useItemsProvider';
import List from './components/List/List';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';

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

  const itemsByVulnerability = items.reduce((itemsByVulnerability, item) => {
    if (itemHasWeakPassword(item)) {
      itemsByVulnerability.weak.push(item);
    }
    if (itemHasReusedPassword(item, items)) {
      itemsByVulnerability.reused.push(item);
    }
    if (itemHasOldPassword(item)) {
      itemsByVulnerability.old.push(item);
    }
    
    return itemsByVulnerability;
  }, {weak: [], old: [], reused: []});

  const getVulnerableItemsCount = () => (
    Object.keys(itemsByVulnerability).reduce((count, key) => count += itemsByVulnerability[key].length, 0)
  );

  return (
    <div className="container">
      <Header vulnerableItemsCount={getVulnerableItemsCount()} username={username} />
      <Filter 
        weakCount={itemsByVulnerability.weak.length}
        reusedCount={itemsByVulnerability.reused.length}
        oldCount={itemsByVulnerability.old.length}
      />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} refreshUserItems={refreshUserItems} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={itemsByVulnerability.weak} refreshUserItems={refreshUserItems} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={itemsByVulnerability.reused} refreshUserItems={refreshUserItems}/>
        </Route>
        <Route path={Routes.Old}>
          <List items={itemsByVulnerability.old} refreshUserItems={refreshUserItems}/>
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
