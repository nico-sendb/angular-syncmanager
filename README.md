# SbSyncamanagerAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Set your information

```
export const environment = {
    production: false,

    // CHANGE HERE FOR LOCAL TESTING

    APP_ID: 'ENTER-YOUR-APP-HERE',
    USER_ID: 'ENTER-YOUR-USER-ID-HERE',
    NICKNAME: 'ANY-NICKNAME-HERE'

};
```

### All starts here

```app.component.ts``` The connection is made here.

### Sendbird service

```sendbird.service.ts``` contains very basic code for setting SyncManager and connecting to Sendbird SDK (if Internet is available)

If no Internet available, you should be able to see the list of channels and the messages you downloaded (you must click on a channel to get its messages stored in local cache. Otherwise, SyncManager can't show any message)



