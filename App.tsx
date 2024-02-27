/**
 * @developer Metrics Ecosystem (ME)
 * @product MiKm
 * @repository https://github.com/Metrics-Ecosystem/mikm.git
 */

/** Imports */
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
  Keyboard,
  DimensionValue,
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

type CommonStyles = {
  margins: DimensionValue;
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
  0: {fontSize: 72, fontWeight: 'bold'}
};

const commonStyles: CommonStyles = {
  margins: '20%'
};

const arthm = (a: number, unit: number, b: number): number => unit ? a+b : a-b;

/** Main component */
function App(): React.JSX.Element {
  /*** States */
  const [miValue, setMi] = useState<string>('0');
  const [kmValue, setKm] = useState<string>('0');
  const [miValueShort, setMiShort] = useState<string>('0');
  const [kmValueShort, setKmShort] = useState<string>('0');
  const [miFont, setMiFont] = useState<FontParams>(fontParams[0]);
  const [kmFont, setKmFont] = useState<FontParams>(fontParams[0]);
  const [miFontShort, setMiFontShort] = useState<FontParams>(fontParams[0]);
  const [kmFontShort, setKmFontShort] = useState<FontParams>(fontParams[0]);
  const [showFull, setShowFull] = useState<boolean>(false);
  
  /*** Functions */
  const handleNumForm = (val: string): string => {
    // - Short long strings
    const decimalIndex: number = val.indexOf('.');
    const eIndex: number = val.indexOf('e');
    if (decimalIndex == -1 || eIndex !== -1) return val;
    return val.slice(0, decimalIndex+3 || val.length-1);
  } 

  const kmToMi = (km: any): void => {
    // - Conversion from kilometres to miles
    const mi: string = km * 0.621371 + '';
    const miShort: string = handleNumForm(mi);
    const kmFontTemp: TextStyle = (fontParams[km.length] || fontParams[km.length + 1]) || fontParams[14];
    setKmFont(kmFontTemp);
    setMiFont((fontParams[mi.length] || fontParams[mi.length + 1]) || fontParams[14]);
    setKmFontShort(kmFontTemp);
    setMiFontShort((fontParams[miShort.length] || fontParams[miShort.length + 1]) || fontParams[14]);
    setKm(km);
    setKmShort(km);
    setMi(mi);
    setMiShort(miShort);
  }

  const miToKm = (mi: any): void => {
    // - Conversion from miles to kilometres
    const km: string = mi / 0.621371 + '';
    const kmShort: string = handleNumForm(km);
    const miFontTemp: TextStyle = (fontParams[mi.length] || fontParams[mi.length + 1]) || fontParams[14];
    setMiFont(miFontTemp);
    setKmFont((fontParams[km.length] || fontParams[km.length + 1]) || fontParams[14]);
    setMiFontShort(miFontTemp);
    setKmFontShort((fontParams[kmShort.length] || fontParams[kmShort.length + 1]) || fontParams[14]);
    setMi(mi);
    setMiShort(mi);
    setKm(km);
    setKmShort(kmShort);
  }

  const nonEmptyStr = (val: string, callback: Function): void => {
    // - Check input after blurring to make sure there is a value
    if (val != '') return;
    callback('0'); // [sets inputs to 0] => miToKm('0') || kmToMi('0')
  }

  const switchVisibilityStatement = (): void => {
    // - Switch statements of full or shorten length of the results
    setShowFull(!showFull);
  }

  const cleanIfZero = (val: string, callbacks: Array<Function>): void => {
    // - Enhacne UX via hiding zero input automatically
      if (val == '0') callbacks.forEach(cb => cb(''))
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={true} />
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.dynamicWrap}>
          <TouchableOpacity onPress={Keyboard.dismiss}>
            <View 
            style={styles.container}>
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.unitArea}>
                  {showFull ? 
                    <TextInput
                      multiline={Platform.OS == 'ios' ? undefined : true}
                      style={[styles.unitInput, miFont]}
                      keyboardType={'decimal-pad'}
                      value={miValue}
                      onChangeText={miToKm}
                      onBlur={() => nonEmptyStr(miValue, miToKm)}
                      onFocus={() => cleanIfZero(miValue, [setMi, setMiShort])}
                    /> :
                    <TextInput
                      multiline={Platform.OS == 'ios' ? undefined : true}
                      style={[styles.unitInput, miFontShort]}
                      keyboardType={'decimal-pad'}
                      value={miValueShort}
                      onChangeText={miToKm}
                      onBlur={() => nonEmptyStr(miValue, miToKm)}
                      onFocus={() => cleanIfZero(miValue, [setMi, setMiShort])}
                    />
                  }
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <View style={[styles.unitArea, styles.division]}>
                  {showFull ? 
                    <TextInput
                      multiline={Platform.OS == 'ios' ? undefined : true}
                      style={[styles.unitInput, kmFont]}
                      keyboardType={'decimal-pad'}
                      value={kmValue}
                      onChangeText={kmToMi}
                      onBlur={() => nonEmptyStr(kmValue, kmToMi)}
                      onFocus={() => cleanIfZero(kmValue, [setKm, setKmShort])}
                    /> :
                    <TextInput
                      multiline={Platform.OS == 'ios' ? undefined : true}
                      style={[styles.unitInput, kmFontShort]}
                      keyboardType={'decimal-pad'}
                      value={kmValueShort}
                      onChangeText={kmToMi}
                      onBlur={() => nonEmptyStr(kmValue, kmToMi)}
                      onFocus={() => cleanIfZero(kmValue, [setKm, setKmShort])}
                    />
                  }
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.switchBtn}
                onPress={switchVisibilityStatement}
                activeOpacity={1}
              >
                <View style={[styles.eyeIcon, (showFull ? styles.eyeIconOn : styles.eyeIconOff)]}>
                  <View style={styles.pupil}></View>
                  {!showFull ? <View style={styles.stroked}></View> : null}
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
    height: (windowHeight / 4),
  },
  unitInput: {
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    flex: 1,
    fontSize: 62,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  switchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '30%',
    height: '10%',
    backgroundColor: '#000000',
    borderRadius: 5,
    position: 'absolute'
  },
  eyeIcon: {
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#000',
    borderTopLeftRadius: 75,
    borderBottomRightRadius: 75,
    position: 'relative',
    transform: [{rotate: '45deg'}]
  },
  eyeIconOn: {
    backgroundColor: '#ffffff',
  },
  eyeIconOff: {
    backgroundColor: '#b9b9b9b9',
  },
  pupil: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    backgroundColor: '#000',
    left: 10,
    top: 10,
  },
  stroked: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderTopColor: '#b9b9b9b9',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: '45%'
  },
  division: {
    borderTopWidth: .3,
    borderTopColor: '#ffffff'
  },
  labelsContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
    top: arthm(windowHeight - windowHeight / 2, 0, windowHeight / 16),
  },
  unitLabelsContainer: {
    width: '15%',
    height: windowHeight / 8,
    right: commonStyles.margins,
  },
  sideLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  eLabel: {
    position: 'absolute'
  }
});

export default App;
