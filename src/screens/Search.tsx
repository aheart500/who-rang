/* eslint-disable curly */
import React, {useState} from 'react';
import GradientView from '../components/GradientView';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Text from '../components/Text';
import SearchInput from '../components/SearchInput';
import StatusBar from '../components/StatusBar';
import {PhoneNumber, SearchState} from '../components/types';
import {SearchProps} from './ScreensProps';
import {PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import {isArabic} from '../Constants';
import {ActivityIndicator, Portal} from 'react-native-paper';
import {getAllWithoutPhotos as getAllContacts} from 'react-native-contacts';

const Search = ({navigation}: SearchProps<'search'>) => {
  const openDrawer = () => navigation.openDrawer();
  const [searchState, setSearchState] = useState<SearchState>({
    value: '',
    type: 'number',
  });

  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const toggleErrorModal = () => setErrorModalVisible(!errorModalVisible);
  const toggleSearchModal = () => setSearchModalVisible(!searchModalVisible);

  const getContacts = () => {
    getAllContacts((err, contacts) => {
      if (err === 'denied') {
        console.log('Error');
      } else {
        let phones: PhoneNumber[] = [];
        contacts.forEach(
          ({givenName, middleName, familyName, phoneNumbers}) => {
            let name = givenName;
            if (middleName) name += ' ' + middleName;
            if (familyName) name += ' ' + familyName;
            phoneNumbers.forEach((phone) =>
              phones.push({
                name,
                number: phone.number,
              })
            );
          }
        );
        navigation.navigate('searchResults', {contacts: phones});
      }
    });
  };

  const handleSearch = () => {
    if (searchState.type === 'number' && searchState.value.length !== 8) {
      toggleErrorModal();
      return;
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'جهات الإتصال',
        message:
          'السماح للتطبيق بالوصول لجهات الإتصال سوف يساعدنا على تحديث قاعدة البيانات لدينا',
        buttonPositive: 'موافق',
      }).then(() => {
        getContacts();
      });
    } else {
      getContacts();
    }
    console.log(searchState);
  };
  return (
    <GradientView>
      <StatusBar />
      <Portal>
        <Modal
          visible={errorModalVisible}
          contentContainerStyle={styles.modalBack}
          onDismiss={toggleErrorModal}>
          <Text align="right" fontSize={20} fontFamily="Cairo-Bold">
            يجب إدخال 8 (أرقام فقط) من دون المفتاح الدولي
          </Text>
          <Text
            onPress={toggleErrorModal}
            color="red"
            fontSize={20}
            fontFamily="Cairo-Regular"
            align="right">
            موافق
          </Text>
        </Modal>
        <Modal
          visible={searchModalVisible}
          dismissable={false}
          contentContainerStyle={[styles.searchingModal, styles.modalBack]}
          onDismiss={toggleSearchModal}>
          <Text align="right" color="gray" fontSize={20} fontWeight="bold">
            جاري البحث...
          </Text>
          <ActivityIndicator size="large" />
        </Modal>
      </Portal>
      <Header openDrawer={openDrawer} />
      <SearchInput
        state={searchState}
        setState={setSearchState}
        handleSearch={handleSearch}
      />
    </GradientView>
  );
};

const styles = StyleSheet.create({
  modalBack: {
    backgroundColor: '#fff',
    marginHorizontal: '10%',
    padding: 15,
    borderRadius: 10,
  },
  searchingModal: {
    flexDirection: isArabic ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});
export default Search;
