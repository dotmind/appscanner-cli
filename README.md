<img src="https://www.maximelb.com/wp-content/uploads/2019/12/1-mUjeG4M7A7kCyisHLsC2Yw.jpeg" width="100%" />

# App Scanner

Find out what the mobile application was developed with.

## 🚀 Roadmap

- [x] Android APK scan
- [ ] Flutter typical architecture scan
- [ ] Xamarin typical architecture scan
- [ ] Ionic typical architecture scan
- [ ] iOS App scan
- [ ] Build an intuitive web app

## 👨🏼‍💻 Installation

1. Install firstly [gplaydl](https://github.com/rehmatworks/gplaydl)
2. Install [Apktool](https://ibotpeaches.github.io/Apktool/documentation/)
3. Install node_mudles with `yarn`

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
