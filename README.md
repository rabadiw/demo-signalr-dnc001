[CloudFoundryURL]: http://cloudfoundry.com
[PWSURL]: https://console.run.pivotal.io/
[MSDOCS1]: https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr-typescript-webpack?view=aspnetcore-2.1&tabs=netcore-cli

# Demo SignalR 001
An ASP.NET Core SignalR with TypeScript and Webpack targeting [CF (Cloud Foundry)][CloudFoundryURL].

## Develop
The application follows the instructions as outlined in article [Use ASP.NET Core SignalR with TypeScript and Webpack][MSDOCS1]. The additional work added include folder structure, CF files, and deployment scrpits.

~~~bash
# build the UI
npm run build:ui

# buld the App
npm run build:app

# start the app
npm start
~~~


## Deploy
The deployment targets the [CF][CloudFoundryURL] platform. You can sign up for a free account [here][PWSURL].

The manifest uses the following minimal settings
~~~yml
---
applications:
- name: demo-signalr-dnc001
  buildpack: dotnet_core_buildpack
  memory: 128M
  disk_quota: 256M
  path: ./bin
  env:
    ASPNETCORE_ENVIRONMENT: Development
~~~

~~~bash
# deploy to a Cloud Foundry provider
# replace demo-signalr-app with a name of your choosing
npm run publish demo-signalr-app
~~~