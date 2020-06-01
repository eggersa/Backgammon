# Backgammon
![](https://raw.githubusercontent.com/eggersa/Backgammon/master/docs/Screenshot.png)

## Terminology

The 24 narrow triangles on the board are called **points**. The stones that are moved around during the game are called **checkers**. The board can be split into four boards. Each player has a **home board**. The remaining two boards are called **outer boards**. The points are numbered from 1 to 24 relative to the players view, so that each players home board is comprised of the points from one to six. The unit of distance between any two points is called **pip**. Pips correspond to the difference in point numbers. You can also consider the rolled value as pips e.g. the allowed amount of points you can cross with your checkers when it is your turn. The vertical space in the middle of the board that separates the home boards from the outer boards is called **bar**.

Note that these terms are used throughout the code base.

## Rules
The rules of the actual Backgammon game have been simplified for the purpose of this project, which is to apply the concept of minimaxing onto a two-player zero-sum game.

### How to win the game
The first player that manages to bear off all his checkers off of his home board wins the game. The other player loses the game. In the actual game, each player gets a number of points based on some criterias which involve an additional doubling cube.

### Start of the game
Here, the human player always starts with the first move. In the real Backgammon game, the player that rolls the bigger number starts with the dice-values, that have just been rolled.

### Moving the checkers
At each turn the current player can execute two moves with his checkers. Each dice constitutes one move crossing a distance in pips equal to the rolled value. A checker is only allowed to move to an open point meaing the point must not have more than one checker of the opposite player. Checkers may only be moved **forward**, that is to a lower numbered point.

A player must always use the rolled numbers if possible. If only one move can be executed, that player must execute that move. If either move is possible but not both, the player must execute the move with the higher number.

In this simplified version of the game, we do not account for doubles e.g. both dice have the same value.

## References

- Material from Lectures
- Artificial Intelligence for Games by Ian Millington
- https://en.wikipedia.org/wiki/Backgammon
- https://www.bkgm.com/rules.html
- https://en.wikipedia.org/wiki/Negamax
- https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning
- http://usbgf.org/learn-backgammon/backgammon-rules-and-terms/rules-of-backgammon/
