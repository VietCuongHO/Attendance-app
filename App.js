/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import ProgressScreen from './src/screens/ProgressScreen/ProgressScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      {/* <Navigation /> */}
      <ProgressScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fbfc',
  },
});

export default App;
