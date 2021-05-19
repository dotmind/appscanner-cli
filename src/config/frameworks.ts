import { FrameworkType } from "src/@types/frameworks";

const frameworks: FrameworkType[] = [
  {
    "name": "React Native",
    "typicalFiles": [
      "assets/index.android.bundle"
    ]
  },
  {
    "name": "Flutter",
    "typicalDirs": [
      "smali/io/flutter"
    ]
  },
  {
    "name": "Xamarin",
    "typicalDirs": [
      "smali/com/xamarin"
    ]
  },
  {
    "name": "Ionic",
    "regex": "<ion-app></ion-app>",
    "occurenceAverage": 1,
  },
  {
    "name": "Cordova",
    "typicalFiles": [
      "assets/public/cordova.js",
      "assets/www/cordova.js"
    ]
  }
]

export default frameworks;
