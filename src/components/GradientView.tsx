import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
const GradientView = ({children}: {children: React.ReactNode}) => {
  return (
    <LinearGradient
      colors={['#0a1836', '#283e78', '#6a94d7']}
      style={styles.view}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
export default GradientView;
