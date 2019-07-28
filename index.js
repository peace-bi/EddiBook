/**
 * @format
 */

import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import { Client } from "bugsnag-react-native";
// import StoryBook from './storybook'

export const bugsnag = new Client("f396a0b31b166a31e7cf7f9da5fe9850");

if (__DEV__) {
  // To see all the requests in the chrome Dev tools in the network tab.
  // XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  // GLOBAL.originalXMLHttpRequest :
  // GLOBAL.XMLHttpRequest;

  // fetch logger
  // global._fetch = fetch;
  // global.fetch = function(uri, options, ...args) {
  //   /* eslint-plugin-disable-all-except */
  // return global._fetch(uri, options, ...args).then((response) => {
  // console.info("Fetch", { request: { uri, options, ...args }, response });
  // return response;
  // });
  // };
}

AppRegistry.registerComponent(appName, () => App);
