import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Terms from './src/screens/Terms';
import Search from './src/screens/Search';
import {AppParamList, DrawerParamList} from './src/screens/ScreensProps';
import Loader from './src/components/Loader';
import Services from './src/screens/Services';
import {StyleSheet} from 'react-native';
import DrawerContent from './src/components/DrawerContent';
const firstTimeFn = async (): Promise<boolean> => {
  return JSON.parse(await AsyncStorage.getItem('firstTime')) ? false : true;
};

const AppStack = createStackNavigator<AppParamList>();
const AppDrawer = createDrawerNavigator<DrawerParamList>();

const Drawer = () => {
  return (
    <AppDrawer.Navigator
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      drawerContent={(props) => <DrawerContent {...props} />}
      openByDefault={true}>
      <AppDrawer.Screen
        name="search"
        options={{title: 'البحث'}}
        component={Search}
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
      <AppStack.Navigator screenOptions={{header: () => null}}>
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
