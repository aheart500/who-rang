/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {isArabic} from '../Constants';
import Text from './Text';
import {SearchProps} from './types';

const SearchInput = ({
  state = {value: '', type: 'number'},
  setState,
  handleSearch,
}: SearchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.searchIconContainer}
          onPress={handleSearch}>
          <FontAwesome name="search" size={40} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={state.value}
          onChangeText={(t) => setState({...state, value: t})}
          placeholder={state.type === 'name' ? 'بحث بالأسم' : 'بحث بالرقم'}
          keyboardType={state.type === 'name' ? 'default' : 'number-pad'}
        />
      </View>
      <View style={styles.searhTypeContainer}>
        <TouchableOpacity
          style={styles.typeItem}
          activeOpacity={0.8}
          onPress={() => setState({value: '', type: 'number'})}>
          <View
            style={[
              styles.typeCircle,
              {
                backgroundColor:
                  state.type === 'number' ? '#49f3f5' : '#363636',
              },
            ]}
          />
          <Text color="#fff" fontFamily="Cairo-Bold" fontSize={24}>
            {' '}
            بحث بالرقم
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeItem}
          activeOpacity={0.8}
          onPress={() => setState({value: '', type: 'name'})}>
          <View
            style={[
              styles.typeCircle,
              {backgroundColor: state.type === 'name' ? '#49f3f5' : '#363636'},
            ]}
          />
          <Text color="#fff" fontFamily="Cairo-Bold" fontSize={24}>
            {' '}
            بحث بالأسم
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  searchInputContainer: {
    flexDirection: !isArabic ? 'row-reverse' : 'row',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  input: {
    flex: 7,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  searchIconContainer: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  searhTypeContainer: {
    flexDirection: !isArabic ? 'row-reverse' : 'row',
    backgroundColor: '#1e1e1e',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    marginVertical: 15,
    padding: 10,
  },
  typeItem: {
    flexDirection: !isArabic ? 'row-reverse' : 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  typeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginHorizontal: 5,
  },
});
export default SearchInput;
