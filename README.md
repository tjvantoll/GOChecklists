# ShinyDex

ShinyDex is a multi-platform app built with NativeScript and the Angular CLI. The app is available on [Google Play](https://play.google.com/store/apps/details?id=com.tjvantoll.ShinyDex) and [the web](https://shinydex.app).

![](assets/apps.png)

## Development

To run ShinyDex locally you need to install the Angular CLI, NativeScript, and NativeScript schematics. You can do so with the following commands.

```
npm install -g @angular/cli
npm install -g nativescript
npm install -g @nativescript/schematics
```

If you want to build the app for iOS or Android, you’ll also need to install NativeScript’s requirements for building native apps. You can find instructions on how to do that on [the NativeScript documentation site](https://docs.nativescript.org/angular/start/quick-setup).

## Running the app

To run the your app on the web use the Angular CLI’s `ng serve` command.

```
ng serve
```

When the command finishes, visit `localhost:4200` in your browser to see your apps.

To run your app for iOS use the following command.

```
tns run ios --bundle
```

And finally, to run your app on Android use the following command.

```
tns run android --bundle
```