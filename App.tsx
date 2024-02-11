/**
 * @developer Metrics Ecosystem (ME)
 * @product MiKm
 * @repository https://github.com/Metrics-Ecosystem/mikm.git
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
// import i18n from './i18n' // localisation library

/** Globals */
const windowHeight = Dimensions.get('window').height;

function App(): React.JSX.Element {
  
  /** States */
  const [miValue, setMi] = useState('');
  const [kmValue, setKm] = useState('');
  
  /** Functions */
  const kmToMi = (km: any) => {
    setMi(km / 0.621371 + '');
    setKm(km + '');
  }

  const miToKm = (mi: any) => {
    setMi(mi);
    setKm(mi * 0.621371 + '');
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={true} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.unitArea}>
                <TextInput style={styles.unitInput} keyboardType='number-pad' value={miValue} onChangeText={miToKm} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.unitArea}>
                <TextInput style={styles.unitInput} keyboardType='number-pad' value={kmValue} onChangeText={kmToMi} />
              </TouchableOpacity>
            </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: '100%'
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    position: 'relative'
  },
  unitArea: {
    backgroundColor: '#000000',
    textAlign: 'center',
    width: '100%',
    height: windowHeight / 2
  },
  unitInput: {
    flex: 1,
    fontSize: 62,
    fontWeight: 'bold',
    height: 80,
    color: '#ffffff',
    textAlign: 'center',
  }
});

export default App;
