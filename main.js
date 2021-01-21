const Players = require('./src/Base/players.js')
const mongoose = require('mongoose')
const Games = require('./src/Base/games.js')
const Connection = require('./connection.js')

const url = 'mongodb+srv://mihir:mihir@cluster0.rf8u5.mongodb.net/Tournament?retryWrites=true&w=majority';
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

function main() {
    console.log("hElLO WoRlD \n")
    mongoose.connect(url,connectionParams)
        .then( () => {
            console.log('Connected to database ')
            Connection.connection = mongoose.connection
            Connection.connection.db.collection("Players", function(err, collection) {
            collection.find({points: 0}).toArray(function(err, data) {
                console.log(data); // it will print your collection data
            })

            });
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
}
if (require.main === module) {
    main()
} 
