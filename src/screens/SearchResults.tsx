/* eslint-disable curly */
import React, {useState} from 'react';
import Text from '../components/Text';
import GradientView from '../components/GradientView';
import {SearchProps} from './ScreensProps';
import {FlatList, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {PhoneNumber} from '../components/types';
import {Portal} from 'react-native-paper';
import Modal from '../components/Modal';
import {openContactForm} from 'react-native-contacts';
import Clipboard from '@react-native-community/clipboard';
const SearchResults = ({route, navigation}: SearchProps<'searchResults'>) => {
  const contacts = route.params.contacts;
  const [selectedContact, setSelectedContact] = useState<PhoneNumber>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const handleClick = (contact: PhoneNumber) => {
    setSelectedContact(contact);
    toggleModal();
  };
  const handleSaveNew = () => {
    openContactForm(
      {
        displayName: selectedContact.name,
        phoneNumbers: [
          {
            label: 'mobile',
            number: selectedContact.number,
          },
        ],
      },
      (err, contact) => {
        if (err) console.log(err);
        if (contact) toggleModal();
      }
    );
  };
  const handleCall = async () => {
    await Linking.openURL('tel:+2' + selectedContact.number);
  };
  const handleSMS = async () => {
    await Linking.openURL('sms:+2' + selectedContact.number);
  };
  const copyToClip = (text: string) => {
    Clipboard.setString(text);
    toggleModal();
  };
  const handleGoBack = () => {
    toggleModal();
    navigation.goBack();
  };
  return (
    <GradientView>
      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={styles.modalStyle}
          onDismiss={toggleModal}>
          <TouchableOpacity onPress={() => copyToClip(selectedContact.name)}>
            <Text>نسخ الأسم</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => copyToClip(selectedContact.number)}>
            <Text>نسخ الرقم</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSMS}>
            <Text>إرسال SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall}>
            <Text>اتصال</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveNew}>
            <Text>حفظ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack}>
            <Text>البحث مجدداً</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <Text color="white" fontSize={30} fontFamily="Cairo-Bold">
        النتائج
      </Text>
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => '' + i}
        renderItem={({item: contact}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleClick(contact)}
              style={styles.cardContianer}>
              <Text align="right">{contact.name}</Text>
              <Text align="right">{contact.number}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </GradientView>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    borderRadius: 10,
    padding: 5,
  },
  cardContianer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
});
export default SearchResults;
