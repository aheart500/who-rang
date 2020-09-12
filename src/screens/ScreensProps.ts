import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {PhoneNumber} from '../components/types';
export type AppParamList = {
  terms: undefined;
  app: undefined;
};
export type DrawerParamList = {
  searchStack: undefined;
  services: undefined;
};
interface searchResultsRouteParams {
  contacts: PhoneNumber[];
}
export type SearchParamList = {
  search: undefined;
  searchResults: searchResultsRouteParams;
};
export type AppProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

export type DrawerProps<T extends keyof DrawerParamList> = {
  navigation: DrawerNavigationProp<DrawerParamList, T>;
  route: RouteProp<DrawerParamList, T>;
};
export type SearchProps<T extends keyof SearchParamList> = {
  navigation: StackNavigationProp<SearchParamList, T> &
    DrawerNavigationProp<DrawerParamList, 'searchStack'>;
  route: RouteProp<SearchParamList, T>;
};
