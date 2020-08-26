// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  stripe_token: 'STRIPE_PUBLISHABLE_KEY',
  paypal_token: 'PAYPAL_CLIENT_ID',
  firebase: {
	apiKey: "AIzaSyDFrdlUinvYtWD5uL61JGFFc51-lW1GbfQ",
    authDomain: "greenandgrainscustapp.firebaseapp.com",
    databaseURL: "https://greenandgrainscustapp.firebaseio.com",
    projectId: "greenandgrainscustapp",
    storageBucket: "greenandgrainscustapp.appspot.com",
    messagingSenderId: "362296403662",
    appId: "1:362296403662:web:b1db5b976e6184fb0a929f",
    measurementId: "G-0H9RPJ5J72"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
