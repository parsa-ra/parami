# ParamiGame
----

* The current name is combination of parsa and amir, Put your other suggestion names and their logic behind it here: 
    * Flipper: Since we flip things


* Current UI Stack is combination of:
    * React-Native
    * Mobx-State-Tree: For state management, Empirically it was better experience in respect to State Management alternatives like Redux.
    * Expo
  

## Setup and Running
* Preferably at first install `Expo Go` App in your android device, Also make an account in `expo.io` which will be required ...
* Install using `npm install` after you pulled the repository, Then just run `expo start --web` to start web session. 


## Some Clarification
* The basics of notificationHandling is accomplished in this commit, when something is pushed to the `notificationQueue` or `navStack` changed relevant notification's will appear if any ... 
* 

## Issues: 
//TODO:
* The fuck happens when the tile  arrangement became narrow (height >>> width ).... 

* Temporally resolved: We had to resize the default splash screen to avoid memory problem with JVM in some older devices: HTC10, Samsung Galaxy S6, Xiaomi mi 5T


## Experimental Suggestion
* May be add Server api call for updating `messages` showed to user? 
  