const MongoClient = require('mongodb').MongoClient;
let db;



module.exports = {
    connectDB: async function () {
        const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clustera0.dtunedq.mongodb.net/?retryWrites=true&w=majority`;
        try {
            const mongoConn = await MongoClient.connect(url);
            db = await mongoConn.db('sample_airbnb');
            // console.log('<<', db)
        } catch (error) {
            console.error(`Error: ${error}`)
            // await MongoClient.close();
            new Error(error)
        }
    },
    getDb: () => db
}

