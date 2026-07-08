import random, sys

print('ROCK, PAPER, SCISSORS')

# These variables keep track of the number of wins, losses, and ties.
wins = 0
losses = 0
ties = 0

while True: # The main game loop
    print('%s Wins, %s Losses, %s Ties' % (wins, losses, ties))
    while True: # The player input loop
        print('Enter your move: (r)ock (p)aper (s)cissors or (q)uit')
        player_move = input('>')
        if player_move =='q':
            sys.exit() #Quit the program.
        if player_move == 'r' or player_move == 'p' or player_move == 's':
            break # Break out of the player input loop.
        print('Type one of r, p, s, or q.')