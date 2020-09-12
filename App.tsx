import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Terms from './src/screens/Terms';
import Search from './src/screens/Search';
import {
  AppParamList,
  DrawerParamList,
  SearchParamList,
} from './src/screens/ScreensProps';
import Loader from './src/components/Loader';
import Services from './src/screens/Services';
import {StyleSheet} from 'react-native';
import DrawerContent from './src/components/DrawerContent';
import SearchResults from './src/screens/SearchResults';

const firstTimeFn = async (): Promise<boolean> => {
  return JSON.parse(await AsyncStorage.getItem('firstTime')) === null
    ? true
    : false;
};

const AppStack = createStackNavigator<AppParamList>();
const AppDrawer = createDrawerNavigator<DrawerParamList>();
const SearchStack = createStackNavigator<SearchParamList>();
const SearchNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}>
      <SearchStack.Screen name="search" component={Search} />
      <SearchStack.Screen name="searchResults" component={SearchResults} />
    </SearchStack.Navigator>
  );
};

const Drawer = () => {
  return (
    <AppDrawer.Navigator
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <AppDrawer.Screen
        name="searchStack"
        options={{title: 'البحث'}}
        component={SearchNavigator}
      />
      <AppDrawer.Screen
        name="services"
        options={{title: 'الخدمات'}}
        component={Services}
      />
    </AppDrawer.Navigator>
  );
};

const App = () => {
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getFirstTime = async () => {
      setFirstTime(await firstTimeFn());
      setLoading(false);
    };
    getFirstTime();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          header: () => null,
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
        }}>
        {firstTime ? <AppStack.Screen name="terms" component={Terms} /> : null}
        <AppStack.Screen name="app" component={Drawer} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#082d4f',
  },
  drawerItem: {
    color: '#fff',
  },
});
export default App;
