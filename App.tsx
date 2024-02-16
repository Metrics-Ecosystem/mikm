/**
 * @developer Metrics Ecosystem (ME)
 * @product MiKm
 * @repository https://github.com/Metrics-Ecosystem/mikm.git
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
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

/** Types */
type TextStyle = {
  fontSize: number;
  fontWeight: string;
}

type FontParams = {
  [key: number]: TextStyle
}

/** Globals */
const windowHeight = Dimensions.get('window').height;
const fontParams: FontParams = {
  14: {fontSize: 17, fontWeight: 'normal'},
  12: {fontSize: 25, fontWeight: 'normal'},
  10: {fontSize: 31, fontWeight: 'bold'},
  8: {fontSize: 41, fontWeight: 'bold'},
  6: {fontSize: 48, fontWeight: 'bold'},
  4: {fontSize: 55, fontWeight: 'bold'},
  2: {fontSize: 62, fontWeight: 'bold'},
};
const commonStyles: any = {
  margins: '25%'
};
const arthm = (a: number, unit: number, b: number) => unit ? a+b : a-b;

/** Main component */
function App(): React.JSX.Element {
  /*** States */
  const [miValue, setMi] = useState('1');
  const [kmValue, setKm] = useState('1.62');
  const [miFont, setMiFont]: any = useState(fontParams[2]);
  const [kmFont, setKmFont]: any = useState(fontParams[6]);
  
  /*** Refs */
  const miInputRef = useRef<TextInput | null>(null);
  const kmInputRef = useRef<TextInput | null>(null);
  
  /*** Functions */
  const handleNumLength = (val: string) => {
    return val.length > 4 ? val.slice(0, 5) + '...' : val;
  } 

  const kmToMi = (km: any) => {
    const resKm: string = km;
    setKmFont((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
    const resMi: string = handleNumLength(km * 0.621371 + '');
    setMiFont((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
    setKm(resKm);
    setMi(resMi);
  }

  const miToKm = (mi: any) => {
    const resMi: string = mi
    setMiFont((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
    const resKm: string = handleNumLength(mi / 0.621371 + '');
    setKmFont((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
    setMi(resMi);
    setKm(resKm);
  }

  const nonEmptyStr = (val: string, unit: string) => {
    // - Check input after blurring to make sure there is a value
    if (val != '') return;
    if (unit == 'mi') miToKm('0');
    if (unit == 'km') kmToMi('0');
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={true} />
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.dynamicWrap}>
            <View style={styles.container}>
              <TouchableOpacity>
                <View style={styles.unitArea}>
                <TextInput
                ref={miInputRef}
                style={[styles.unitInput, miFont]}
                keyboardType='number-pad'
                value={miValue}
                onChangeText={miToKm}
                onBlur={() => nonEmptyStr(miValue, 'mi')}
                />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={[styles.unitArea, styles.division]}>
                  <TextInput 
                  ref={kmInputRef}
                  style={[styles.unitInput, kmFont]}
                  keyboardType='number-pad'
                  value={kmValue}
                  onChangeText={kmToMi}
                  onBlur={() => nonEmptyStr(kmValue, 'km')}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.labelsContainer}>
                <Text style={styles.unitLabel}>mi</Text>
                <Text style={styles.unitLabel}>km</Text>
              </View>
            </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Stylesheets */
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000000',
    height: windowHeight,
  },
  dynamicWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: windowHeight,
    position: 'relative',
  },
  unitArea: {
    marginRight: commonStyles.margins,
    marginLeft: commonStyles.margins,
    width: 'auto',
    height: (windowHeight / 6),
  },
  unitInput: {
    flex: 2,
    fontSize: 62,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  division: {
    borderTopWidth: .3,
    borderTopColor: '#ffffff'
  },
  labelsContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
    width: '25%',
    height: windowHeight / 10,
    right: commonStyles.margins,
    top: arthm(windowHeight - windowHeight / 2, 0, windowHeight / 20),
  },
  unitLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center'
  }
});

export default App;
