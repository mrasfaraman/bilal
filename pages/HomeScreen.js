import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View,TouchableHighlight } from 'react-native';
import bg from '../assets/images/bg.png';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { password } = useAuth();

  if (password) {
    navigation.navigate('LoginScreen');
  }

  const { t } = useTranslation();
  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          i18n.changeLanguage(selectedLanguage);
        }
      } catch (error) {
        console.error('Error loading selected language:', error);
      }
    };
    loadSelectedLanguage();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.screenBackgroud }}>
      <View style={{ marginTop: 35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 80 }}>
        <Image source={bg} />
      </View>
      <View style={{ marginLeft: 16, marginRight: 16, marginBottom: 70 }}>
        <Text style={{ color: theme.text, fontFamily: 'SF Pro Text', fontSize: 30, fontStyle: 'normal', fontWeight: '600' }}>
          {t('the_only_crypto_wallet_you’d_ever_need')}
        </Text>
        <TouchableOpacity
          style={{ paddingVertical: 14, paddingHorizontal: 12, borderColor: theme.buttonBorder, borderStyle: 'solid', borderWidth: 1, borderRadius: 1000, marginTop:50 }}
          onPress={() => navigation.navigate('CreateWalletScreen')}>
          <Text style={{ color: theme.text, textAlign: 'center', fontFamily: 'SF Pro Text', fontSize: 14, fontWeight: '600' }}>
            {t('get_started')}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40, flexWrap:'wrap', }}>
          <Text style={{ color: theme.text, fontSize: 12 }}>
            {t('by_tapping_get_started_you_agree_and_consent_to_our')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Term')}>
            <Text style={{ textDecorationLine: 'underline', fontWeight: '600', color: theme.emphasis, marginLeft: 10, fontSize:12, marginTop:6 }}>
              {t('terms_&_service')}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: 12, marginTop:6 }}>
            {' '}{t('and')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
            <Text style={{ textDecorationLine: 'underline', fontWeight: '600', color: theme.emphasis,fontSize:12, marginTop:6 }}>
              {t('privacy_policy')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
