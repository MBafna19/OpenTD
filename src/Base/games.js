const Players = require('./players.js')
const mongoose = require('mongoose')

const url = 'mongodb+srv://mihir:mihir@cluster0.rf8u5.mongodb.net/Tournament?retryWrites=true&w=majority';
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

let games = []

//player1 is white, player 2 is black
exports.game_init = (player1, player2, round, connection) => {
  let currGame = {
    id_white: player1.id,
    id_black: player2.id,
    round: round,
    result : 'n'
  }
  
  connection.Games.insert(currGame)
  
  games.push(currGame)
  player1.played[round] = currGame
  player1.color++
  player2.played[round] = currGame
  player2.color--
  return currGame
}

//// TODO: Function that can mark the result of a game
exports.game_result = (game, result, players) => {
  game.result = result
  if(result ==='w'){
    for(let i = 0; i < players.length; i++){
      if(players[i].id == game.id_white){
        players[i].points += 1.0
      }
    }
  }
  else if(result ==='b'){
    for(let i = 0; i < players.length; i++){
      if(players[i].id == game.id_black){
        players[i].points += 1.0
      }
    }
  }
  else if(result ==='d'){
    for(let i = 0; i < players.length; i++){
      if(players[i].id == game.id_white ||players[i].id == game.id_black){
        players[i].points += 0.5
      }
    }
  }
}

// TODO: Print a game
exports.single_game = (game) =>{
  for(let i = 0; i < players.length; i++){
    if(players[i].id == game.id_white){
      console.log(players[i].firstName + " " + players[i].lastName + " (" +
      players[i].points + ", " + players[i].rating + ")    ")
    }
  }
  for(let i = 0; i < players.length; i++){
    if(players[i].id == game.id_black){
      console.log(players[i].firstName + " " + players[i].lastName + " (" +
      players[i].points + ", " + players[i].rating + ")\n")
    }
  }
}



// TODO: Print all games and rounds
exports.all_games = () => { //array of games
  console.log("ROUND " + roundNum)
  console.log("          White                     Black    ")
  for(let i = 0; i < rounds.length; i++){
    single_game(games[i])
  }
}

//1 is white, -1 is black
exports.get_color = (game, player) => {
  if(player.id == game.id_white) {
    return 1
  }  else {
    return -1
  }
}

exports.getGamesArray = () => {
  return games
}

