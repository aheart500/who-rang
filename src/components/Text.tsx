import React from 'react';
import {
  Text as NativeText,
  I18nManager,
  StyleSheet,
  TextProps as NativeProps,
} from 'react-native';
interface CustomStyles {
  color?: string;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontFamily?: 'Cairo-Regular' | 'Cairo-Bold';
}

interface TextProps extends NativeProps, CustomStyles {
  children: React.ReactNode;
  align?: 'right' | 'left' | 'center';
}

const Text = ({
  align,
  children,
  fontWeight,
  color,
  fontSize,
  fontFamily,
  ...props
}: TextProps) => {
  let customStyles: CustomStyles = {};
  if (color) {
    customStyles.color = color;
  }
  if (fontSize) {
    customStyles.fontSize = fontSize;
  }
  if (fontWeight) {
    customStyles.fontWeight = fontWeight;
  }
  if (fontFamily) {
    customStyles.fontFamily = fontFamily;
  }
  return (
    <NativeText
      {...props}
      style={[
        align === 'left'
          ? styles.leftText
          : align === 'right'
          ? styles.rightText
          : styles.center,
        customStyles ? customStyles : null,
        props.style,
      ]}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  rightText: {
    textAlign: I18nManager.isRTL ? 'left' : 'right',
  },
  leftText: {
    textAlign: !I18nManager.isRTL ? 'left' : 'right',
  },
  center: {
    textAlign: 'center',
  },
});

export default Text;
