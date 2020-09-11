import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Text from './Text';
import {Avatar} from 'react-native-paper';
import {isArabic} from '../Constants';
const icons = [
  require('../../assets/icons/search-icon.png'),
  require('../../assets/icons/box-icon.png'),
];
const DrawerContent = ({
  navigation,
  state,
  descriptors,
}: DrawerContentComponentProps) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={index}
            style={styles.drawerItemStyle}>
            <Avatar.Image
              source={icons[index]}
              size={40}
              style={styles.iconStyle}
            />
            <Text align="right" style={styles.labelStyle}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 40,
  },
  drawerItemStyle: {
    flexDirection: isArabic ? 'row' : 'row-reverse',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  labelStyle: {
    color: '#fff',
    fontSize: 20,
    width: '100%',
    [isArabic ? 'marginLeft' : 'marginRight']: 20,
    fontFamily: 'Cairo-Bold',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
});

export default DrawerContent;
