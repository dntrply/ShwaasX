## ShwaasX Android App
ShwaasX is a tool that can be used by field workers in identifying high risk conditions that require that a patient visit a medical care facility. 

Shwaas was originally developed during Covid to identify those who are at risk of pneumonia. We now plan to expand the scope of Shwaas to include other ailments as well. Details to follow. 


### Some details to know before development

- Ported into Expo from [shwaas-android](https://github.com/SamanvayOrg/shwaas-android)
- All questions are in the domain directory
- Stories / storybook is not ported yet
- Uses [React Native Paper](https://callstack.github.io/react-native-paper/) for components
- Use eslint cleanup in Intellij if you find too many red lines. You might need to set up node to do this.

### Development

- Follow instructions to set up a project for Expo at [Introduction](https://docs.expo.dev/get-started/introduction/)
- Clone this repository
- Start an emulator
- npx expo install
- nox expo start (to run and test on a web browser)
- npx expo run:android (to run and test on an emulator)

## What is still to be ported
- Storybook
- Analytics
- Staging ENvironment
- Dev apk build and test environment
- Production apk build and test environment

~~### Storybook~~
~~App.js has two lines in the end~~
~~```~~
~~export default codePush(App);~~
~~export {default} from './storybook';~~
~~```~~
~~If you want to run the app, uncomment the first line. Else uncomment the second line.~~

### Links

[Design](https://www.figma.com/file/8Y8xJ5rJP5xYieDJHrhAng/covid-tool?node-id=109%3A1715)

[Trello](https://trello.com/b/WbzPBJrf/pneumonia-app)

[Documentation](https://drive.google.com/drive/folders/16lVSZA2ki3nhjJ35WkUwU6Zy7Tky_Ohx)

~~### Release apk to staging~~

~~- Get values for ~/.gradle/gradle.properties and shwaas.keystore (android/app)~~
~~- Change value of CodePushDeploymentKey in android/app/src/main/values/strings.xml to production~~
~~- `make create-bundle`~~
~~- Upload bundle~~
~~### Release apk to production~~
~~- Update versionCode and versionName in android/app/build.gradle~~
~~- Get values for ~/.gradle/gradle.properties and shwaas.keystore (put it in android/app) from Keeweb~~
~~- Change value of CodePushDeploymentKey in android/app/src/main/values/strings.xml to production~~
~~- `make create-bundle`~~
~~- Upload bundle~~
~~### Codepush~~
~~Staging - `make codepush-staging`~~
~~Production - `make codepush-production`~~