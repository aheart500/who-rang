import React from 'react';
import Text from '../components/Text';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View} from 'react-native';
import {isArabic} from '../Constants';
const Header = ({openDrawer}) => {
  return (
    <View style={styles.header}>
      <Ionicons
        name="md-menu"
        size={40}
        color="#fff"
        style={styles.headerIcon}
        onPress={openDrawer}
      />
      <Text
        color="white"
        fontSize={30}
        fontFamily="Cairo-Regular"
        fontWeight="bold">
        من المتصل
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    margin: 10,
    flexDirection: isArabic ? 'row' : 'row-reverse',
    justifyContent: 'center',
    position: 'relative',
  },
  headerIcon: {
    position: 'absolute',
    [isArabic ? 'right' : 'left']: 10,
  },
});

export default Header;
