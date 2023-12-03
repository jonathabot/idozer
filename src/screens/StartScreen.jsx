import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper/src';
import WelcomeScreen from './WelcomeScreen';
import LoginOrRegisterScreen from './LoginOrRegisterScreen';

export default function Screen() {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <WelcomeScreen />
      <LoginOrRegisterScreen />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});