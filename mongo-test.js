const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient('mongodb://localhost', { useNewUrlParser: true });

mongoClient.connect(async (error, connect) => {
    const db = connect.db('sugar');
    const collection = db.collection('sugar');

    // const lastItem = await collection.find().sort({ $natural: -1 }).limit(1).toArray();

    // console.log(lastItem[0]._id)

    // collection.update({ _id: lastItem[0]._id }, {
    //     $set: {
    //         insulin: 'NEW_last'
    //     }
    // });
    collection.find().toArray().then(console.log)
    //    console.log(collection.find().limit(1).sort({$natural:-1}).pretty());
    // collection.update({}, {
    //     $set: {
    //         insulin: 'someInsulinValue'
    //     }
    // }, (error, result) => {
    //     console.log(error)
    //     console.log(result)
    // })

})
