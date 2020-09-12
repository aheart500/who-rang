import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Modal as NativeModal} from 'react-native-paper';
interface ModalProps {
  children: React.ReactNode;
  onDismiss: () => void;
  visible: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  dismissable?: boolean;
}

const Modal: React.FC<ModalProps> = ({children, ...props}) => {
  return <NativeModal {...props}>{children}</NativeModal>;
};

export default Modal;
