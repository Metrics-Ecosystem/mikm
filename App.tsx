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
} from 'react-native';
// import i18n from './i18n' // localisation library

function App(): React.JSX.Element {
  const [miValue, setMi] = useState('');
  const [kmValue, setKm] = useState('');
  const [isUpperActive, setUpperActive] = useState(true);

  const switchActiveInput = () => {
    setUpperActive((prev) => !prev);
  }

  const kmToMi = () => {
    // maths
    setMi(kmValue);
  }

  const miToKm = () => {
    // maths
    setKm(miValue);
  }

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
            <View style={styles.container}>
              <TouchableOpacity onPress={miToKm} style={styles.unitArea}>
                <TextInput style={styles.unitInput} keyboardType='numeric' value={kmValue} onChangeText={setMi} />
              </TouchableOpacity>
              <TouchableOpacity onPress={kmToMi} style={styles.unitArea}>
                <TextInput style={styles.unitInput} keyboardType='numeric' value={kmValue} onChangeText={setKm} />
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
  },
  unitInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    color: '#ffffff'
  }
});

export default App;
