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
const windowHeight: number = Dimensions.get('window').height;
const fontParams: FontParams = {
  14: {fontSize: 25, fontWeight: 'normal'},
  12: {fontSize: 28, fontWeight: 'normal'},
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
  const [miValue, setMi]: any = useState('0');
  const [kmValue, setKm]: any = useState('0');
  const [miValueShort, setMiShort]: any = useState('0');
  const [kmValueShort, setKmShort]: any = useState('0');
  const [miFont, setMiFont]: any = useState(fontParams[2]);
  const [kmFont, setKmFont]: any = useState(fontParams[6]);
  const [miFontShort, setMiFontShort]: any = useState(fontParams[2]);
  const [kmFontShort, setKmFontShort]: any = useState(fontParams[6]);
  const [showFull, setShowFull]: any = useState(false);
  
  /*** Refs */
  const miInputRef = useRef<TextInput | null>(null);
  const kmInputRef = useRef<TextInput | null>(null);
  
  /*** Functions */
  const handleNumForm = (val: string) => {
    // - Short long strings !!toComplete
    return val.slice(0, val.indexOf('.')+2 || val.length-1);
  } 

  const kmToMi = (km: any) => {
    // - Conversion from kilometres to miles
    const resKm: string = km;
    const resMi: string = handleNumForm(km * 0.621371 + '');
    setKm(resKm);
    setKmFont((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
    setKmShort(handleNumForm(resKm));
    setKmFontShort((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
    setMi(resMi);
    setMiFont((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
    setMiShort(handleNumForm(resMi));
    setMiFontShort((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
  }

  const miToKm = (mi: any) => {
    // - Conversion from miles to kilometres
    const resMi: string = mi
    const resKm: string = handleNumForm(mi / 0.621371 + '');
    setMi(resMi);
    setMiFont((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
    setMiShort(handleNumForm(resMi));
    setMiFontShort((fontParams[resMi.length] || fontParams[resMi.length + 1]) || fontParams[14]);
    setKm(resKm);
    setKmFont((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
    setKmShort(handleNumForm(resKm));
    setKmFontShort((fontParams[resKm.length] || fontParams[resKm.length + 1]) || fontParams[14]);
  }

  const nonEmptyStr = (val: string, unit: string) => {
    // - Check input after blurring to make sure there is a value
    if (val != '') return;
    if (unit == 'mi') miToKm('0');
    if (unit == 'km') kmToMi('0');
  }

  const blurAll = () => Keyboard.dismiss();

  const switchVisibilityStatement = () => {
    // - Switch statements of full or shorten length of the results
    if (showFull) return setShowFull(false);
    setShowFull(true);
  }

  const cleanIfZero = (val: string, unit: string) => {
    // - Enhacne UX via cleaning zero input automatically
    return (
      unit == 'mi' ? 
        (val == '0' ? (setMi(''), setMiShort('')) : null) : 
        (val == '0' ? (setKm(''), setKmShort('')) : null)
    )
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
                  {showFull ? 
                    <TextInput
                    ref={miInputRef}
                    style={[styles.unitInput, miFont]}
                    keyboardType={'decimal-pad'}
                    value={miValue}
                    onChangeText={miToKm}
                    onBlur={() => nonEmptyStr(miValue, 'mi')}
                    onFocus={() => cleanIfZero(miValue, 'mi')}
                    /> :
                    <TextInput
                    style={[styles.unitInput, miFontShort]}
                    keyboardType={'decimal-pad'}
                    value={miValueShort}
                    onChangeText={miToKm}
                    onBlur={() => nonEmptyStr(miValue, 'mi')}
                    onFocus={() => cleanIfZero(miValue, 'mi')}/>
                  }
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={[styles.unitArea, styles.division]}>
                  {showFull ? 
                    <TextInput 
                    ref={kmInputRef}
                    style={[styles.unitInput, kmFont]}
                    keyboardType={'decimal-pad'}
                    value={kmValue}
                    onChangeText={kmToMi}
                    onBlur={() => nonEmptyStr(kmValue, 'km')}
                    onFocus={() => cleanIfZero(kmValue, 'km')}
                    /> :
                    <TextInput 
                    style={[styles.unitInput, kmFontShort]}
                    keyboardType={'decimal-pad'}
                    value={kmValueShort}
                    onChangeText={kmToMi}
                    onBlur={() => nonEmptyStr(kmValue, 'km')}
                    onFocus={() => cleanIfZero(kmValue, 'km')}
                    />
                  }
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.switchBtn}
              onPress={switchVisibilityStatement}
              >
                <View style={styles.arrowContainer}>
                  <View style={styles.upArrow}></View>
                  <View style={styles.downArrow}></View>
                </View>
              </TouchableOpacity>
              <View style={[styles.labelsContainer, styles.unitLabelsContainer]}>
                <Text style={styles.sideLabel}>mi</Text>
                <Text style={styles.sideLabel}>km</Text>
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
    textAlign: 'center'
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
    top: arthm(windowHeight - windowHeight / 2, 0, windowHeight / 20),
  },
  unitLabelsContainer: {
    width: '12.5%',
    height: windowHeight / 10,
    right: commonStyles.margins,
  },
  sideLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center',
  }
});

export default App;
