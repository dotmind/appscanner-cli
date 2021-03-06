import { FrameworkType } from "src/@types/frameworks";

const frameworks: FrameworkType[] = [
  {
    name: "React Native",
    typicalFiles: [
      "assets/index.android.bundle",
      "smali/com/facebook/react",
      "smali_classes2/com/reactnative",
      "assets/ReactMobileConfigMetadata.json",
      "assets/react_native_routes.json"
    ]
  },
  {
    name: "Flutter",
    typicalDirs: [
      "smali/io/flutter",
      "assets/flutter_assets",
      "assets/flutter_shared"
    ]
  },
  {
    name: "Xamarin",
    typicalDirs: [
      "smali/com/xamarin"
    ]
  },
  {
    name: "Ionic",
    regex: "<ion-app></ion-app>",
    occurenceAverage: 1,
  },
  {
    name: "Cordova",
    typicalFiles: [
      "assets/public/cordova.js",
      "assets/www/cordova.js"
    ]
  },
  {
    name: "Capacitor",
    typicalFiles: [
      "assets/capacitor.config.json",
      "assets/capacitor.plugins.json"
    ]
  },
  {
    name: "Quasar",
    regex: "quasar-framework",
    occurenceAverage: 100000,
  }
]

export default frameworks;
