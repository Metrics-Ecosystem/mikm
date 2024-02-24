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
  Keyboard
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
  const [miValue, setMi] = useState('0');
  const [kmValue, setKm] = useState('0');
  const [miFont, setMiFont]: any = useState(fontParams[2]);
  const [kmFont, setKmFont]: any = useState(fontParams[6]);
  const [timer, setTimer]: any = useState(null);
  
  /*** Refs */
  const miInputRef = useRef<TextInput | null>(null);
  const kmInputRef = useRef<TextInput | null>(null);
  
  /*** Functions */
  const handleNumLength = (val: string) => {
    // - Shorten long strings !!toComplete
    return val.length > 4 ? val.slice(0, 5) + '...' : val;
  } 

  const kmToMi = (km: any) => {
    // - Conversion from kilometres to miles
    const resKm: string = km;
    setKmFont((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
    const resMi: string = handleNumLength(km * 0.621371 + '');
    setMiFont((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
    setKm(resKm);
    setMi(resMi);
  }

  const miToKm = (mi: any) => {
    // - Conversion from miles to kilometres
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

  const handleTap = () => {
    // - Hanlde doubletaps with dots
    if (timer) {
      // Write a dot
      const dot = '.';
      return miInputRef.current?.isFocused() && miValue.indexOf(dot) == -1 ? 
        miToKm(miValue + dot) : 
        (kmInputRef.current?.isFocused() && kmValue.indexOf(dot) == -1 ? 
        kmToMi(kmValue + dot) : 
        null);
    }
    setTimer(setTimeout(() => {setTimer(null)}, 299));
  }

  const blurAll = () => Keyboard.dismiss();

  const switchValues = () => {
    // - Switch values between miles and kilometers
    // miToKm(kmValue);
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={true} />
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.dynamicWrap}>
          <TouchableOpacity onPress={blurAll}>
            <View 
            style={styles.container}>
              <TouchableOpacity>
                <View style={styles.unitArea}>
                <TextInput
                ref={miInputRef}
                style={[styles.unitInput, miFont]}
                keyboardType='number-pad'
                value={miValue}
                onChangeText={miToKm}
                onPressIn={handleTap}
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
                  onPressIn={handleTap}
                  onBlur={() => nonEmptyStr(kmValue, 'km')}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.switchBtn}
              onPress={switchValues}
              >
                <View style={styles.arrowContainer}>
                  <View style={styles.upArrow}></View>
                  <View style={styles.downArrow}></View>
                </View>
              </TouchableOpacity>
              <View style={styles.labelsContainer}>
                <Text style={styles.unitLabel}>mi</Text>
                <Text style={styles.unitLabel}>km</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    height: (windowHeight / 6)
  },
  unitInput: {
    flex: 2,
    fontSize: 62,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '25%',
    height: 35,
    backgroundColor: '#000000',
    borderRadius: 5,
    marginTop: 10,
    position: 'absolute',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  upArrow: {
    borderTopWidth: 10,
    borderTopColor: 'white',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0
  },
  downArrow: {
    borderBottomWidth: 10,
    borderBottomColor: 'white',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0
  },
  division: {
    borderTopWidth: .3,
    borderTopColor: '#ffffff'
  },
  labelsContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
    width: '12.5%',
    height: windowHeight / 10,
    right: commonStyles.margins,
    top: arthm(windowHeight - windowHeight / 2, 0, windowHeight / 20),
  },
  unitLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center',
  }
});

export default App;
