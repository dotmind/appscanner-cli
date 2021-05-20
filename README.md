<img src="https://www.maximelb.com/wp-content/uploads/2019/12/1-mUjeG4M7A7kCyisHLsC2Yw.jpeg" width="100%" />

# App Scanner

Find out what the mobile application was developed with.

## How it works (steps)

1. Download APK with [gplaydl](https://github.com/rehmatworks/gplaydl)
2. Decode APK with [Apktool](https://ibotpeaches.github.io/Apktool/documentation/)
3. Scan decoded APK to find out what framework is used

## 🚀 Roadmap

### Frameworks compatibilies

> Try to update frameworks following [State of JS Mobile](https://2020.stateofjs.com/en-US/technologies/mobile-desktop/)

- [x] [React Native](https://reactnative.dev/)
- [x] [Flutter](https://flutter.dev/)
- [x] [Xamarin](https://dotnet.microsoft.com/apps/xamarin)
- [x] [Cordova](https://cordova.apache.org/)
- [x] [Capacitor](https://capacitorjs.com/)
- [x] [Ionic](https://ionicframework.com/)

### Scan features

- [x] Android APK scan
- [ ] iOS App scan
- [x] Bulk Scan
- [ ] Build an intuitive web app
- [ ] Scan vulnerabilities
  - [x] Scan sensitive data
  - [ ] Scan security fails

## 👨🏼‍💻 Installation

1. Install firstly [gplaydl](https://github.com/rehmatworks/gplaydl) and login with your Play Store account
2. Install [Apktool](https://ibotpeaches.github.io/Apktool/documentation/)
3. Install node_modules with `yarn`

## 🏄🏼‍♂️ Run

`yarn start --apkID com.facebook.katana`

or

`yarn start` and next enter APK ID.

or to bulk scan

`yarn start --scanListFile ./.scan/apkIDs.txt`

## 🕵🏼 How to detect Frameworks

### By detecting typical architecture files (100% reliable)

Example a **React Native** Android decompiled app always contains an `assets/index.android.bundle` file.

### With grep match (50% reliable - not suggested)

`grep -iR "react_native\|react-native\|reactnative" ${apkDecodedPath} | wc -w`
