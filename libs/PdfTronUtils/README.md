
# react-native-pdf-tron-utils

## Getting started

`$ npm install react-native-pdf-tron-utils --save`

### Mostly automatic installation

`$ react-native link react-native-pdf-tron-utils`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-pdf-tron-utils` and add `RNPdfTronUtils.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNPdfTronUtils.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNPdfTronUtilsPackage;` to the imports at the top of the file
  - Add `new RNPdfTronUtilsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-pdf-tron-utils'
  	project(':react-native-pdf-tron-utils').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-pdf-tron-utils/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-pdf-tron-utils')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNPdfTronUtils.sln` in `node_modules/react-native-pdf-tron-utils/windows/RNPdfTronUtils.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Pdf.Tron.Utils.RNPdfTronUtils;` to the usings at the top of the file
  - Add `new RNPdfTronUtilsPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNPdfTronUtils from 'react-native-pdf-tron-utils';

// TODO: What to do with the module?
RNPdfTronUtils;
```
  