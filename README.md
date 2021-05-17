# ParamiGame
----

* Current UI Stack is a combination of:
    * React-Native
    * Mobx-State-Tree: For state management, Empirically it was a better experience in respect to State Management alternatives like Redux.
    * Expo
  

## Setup and Running
* Preferably at first install `Expo Go` App in your android device, Also make an account in `expo.io` which will be required if you want to build the android or ios port from expo's cloud.
* Install using `npm install` after you pulled the repository, Then just run `expo start --web` to start the web session. 


## Some Clarification
* The basics of notificationHandling is accomplished in this commit, when something is pushed to the `notificationQueue` or `navStack` changed relevant notification's will appear if any ... 
* 

## Known Issues: 
* The fuck happens when the tile arrangement became narrow (height >>> width )... 
* Temporally resolved: We had to resize the default splash screen to avoid memory problem with JVM in some older devices: HTC10, Samsung Galaxy S6, Xiaomi mi 5T


## Experimental Suggestion
* Maybe add Server API call for updating `messages` showed to the user? 
* Add Edge handling, I'm thinking of `wrapping` mode in both horizontal and vertical direction. 



## Ideas To Implement In the Game
* Change modes in between moves: Switch between different modes (e.g., plus sign and rectangle) after each move.
* Move the tiles: Zoom only to a smaller fraction of the board and change the magnifier position after a couple of moves.
* Toggle visibility of the tiles.
* Add new pairs of colors.
* Define a template (e.g., flower picture, car picture) as a starter for the board.
* Change the size of the board (e.g., 10x10, 16x16): The issue with increasing the size of the board is that the size of each tile becomes very small.
