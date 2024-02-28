// jest.mock('react-native', () => {
//     const originalModule = jest.requireActual('react-native');
//     return {
//         ...originalModule,
//         Platform: {
//             OS: 'ios'
//         },
//         NativeModules: {
//             SettingsManager: {
//                 settings: {
//                     AppleLocale: 'en_US',
//                     AppleLanguages: ['en_US']
//                 },
//             },
//             I18nManager: {
//                 localeIdentifier: 'en_US'
//             },
//             ProgressBarAndroid: {},
//             Clipboard: {},
//         },
//         Dimensions: {
//             get: jest.fn().mockReturnValue({height: 800, width: 600}),
//         },
//     };
// });

// // jest.spyOn(console, 'warn').mockImplementation(warning => {
// //     if (!warning.includes('ProgressBarAndroid') && !warning.includes('Clipboard')) {
// //         console.warn(warning);
// //     }
// // });
