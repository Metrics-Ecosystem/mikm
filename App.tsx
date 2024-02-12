/**
 * @developer Metrics Ecosystem (ME)
 * @product MiKm
 * @repository https://github.com/Metrics-Ecosystem/mikm.git
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import i18n from './i18n' // localisation library

/** Globals */
const windowHeight = Dimensions.get('window').height * 0.5;

function App(): React.JSX.Element {
  
  /** States */
  const [miValue, setMi] = useState('1');
  const [kmValue, setKm] = useState('1.62');
  // const [dynamicStyles, setDynamicStyles]: any = useState(styles.noPoint);
  
  /** Refs */
  const miInputRef = useRef<TextInput | null>(null);
  const kmInputRef = useRef<TextInput | null>(null);
  
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
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.dynamicWrap}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
            <View style={styles.container}>
              <TouchableOpacity>
                <View style={styles.unitArea}>
                <TextInput
                ref={miInputRef}
                style={[styles.unitInput]}
                keyboardType='number-pad'
                value={miValue}
                onChangeText={miToKm}
                />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.unitArea}>
                  <TextInput 
                  ref={kmInputRef}
                  style={[styles.unitInput]}
                  keyboardType='number-pad'
                  value={kmValue}
                  onChangeText={kmToMi} />
                </View>
              </TouchableOpacity>
            </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: '100%'
  },
  dynamicWrap: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  unitArea: {
    textAlign: 'center',
    width: '100%',
    height: windowHeight / 2
  },
  unitInput: {
    flex: 2,
    fontSize: 62,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    width: 'auto'
  },
  // point: {
  //   pointerEvents: 'auto'
  // },
  // noPoint: {
  //   pointerEvents: 'none'
  // }
});

export default App;
