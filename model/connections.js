// const { MongoClient } = require('mongodb');

// const MONGODB_URL = 'mongodb://mongodb:27017';
// const DB_NAME = 'StoreManager';

// const connection = () => {
//   return MongoClient.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//     .then((conn) => conn.db(DB_NAME))
//     .catch((err) => {
//       console.error(err);
//       process.exit();
//     });
// };

// module.exports = connection;


const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

const connection = () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;