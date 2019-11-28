# weather-app

This project started as a way for me to play around with native code and create native modules. I didn't get far with that because I got carried away with the weather features I plan to implement but I will continue playing around with native code and learning Swift.

I still need to make improvements to the architecture and hide sensitive info like api keys. The archcitecture of the project is basically how I personally like to setup my personal projects.

I'm using Microsoft App Center for OTA updates, distribution, and logging events. I'm planning of using Firebase for AdMob but not really sure what else I'm going to use it for in the future since I plan to implement more features.
One of the features that I really wanted to implement was having a list of cities and users can select the city they wish to see the current weather for (similar to the iOS weather app). I'm using OpenWeather API to fetch weather data, and AsyncStorage to locally save the list of cities the user adds.


## Run the app

**1. Clone the app**

`git clone git@github.com:corasan/weather-app.git`

OR

`git clone https://github.com/corasan/weather-app.git`

**2. Install dependencies**

`cd weather-app && yarn install`

**3. Install pods**

`cd ios && pod install && cd ..`

**4. Start the packager and run the app**

`yarn start && react-native run-ios`
