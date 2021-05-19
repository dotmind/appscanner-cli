# App Scanner

Search which mobile app framework company using.

## Installation

1. Install firstly [gplaydl](https://github.com/rehmatworks/gplaydl)
2. Install [Apktool](https://ibotpeaches.github.io/Apktool/documentation/)
3. Install node_mudles with `yarn`

## Run

`yarn start --apkID com.facebook.katana`

or

`yarn start` and next enter APK ID.

or to bulk scan

`yarn start --scanListFile ./.scan/apkIDs.txt`

## How to detect Framework

### By detecting typical architecture files (100% reliable)

Example a **React Native** Android decompiled app always contains an `assets/index.android.bundle` file.

### With grep match (50% reliable - not suggested)

`grep -iR "react_native\|react-native\|reactnative" ${apkDecodedPath} | wc -w`
