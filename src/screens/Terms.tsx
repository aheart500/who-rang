import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Text from '../components/Text';
import {AppProps} from './ScreensProps';
import {terms} from '../Data';
import {Button} from 'react-native-paper';
import GradientView from '../components/GradientView';
import StatusBar from '../components/StatusBar';

const Terms = ({navigation}: AppProps<'terms'>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const acceptTerms = async () => {
    setLoading(true);
    await AsyncStorage.setItem('firstTime', 'false');
    setLoading(false);
    navigation.navigate('app');
  };

  return (
    <View style={styles.view}>
      <StatusBar />
      <GradientView>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>
            عند استعمال التطبيق تكون قد وافقت على شروط التطبيق وسياسة استخدام
            البيانات{' '}
          </Text>
          <Text align="right" style={styles.termsText}>
            {terms}
          </Text>
        </ScrollView>
      </GradientView>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        loading={loading}
        onPress={acceptTerms}>
        {!loading && 'موافق على استعمال التطبيق'}
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  termsText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Terms;
