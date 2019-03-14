const {MongoClient}=require("mongodb")
const mongodbUrl="mongodb://localhost:27017"
sql={
    "insert":(database,collectionName,insertData)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(mongodbUrl,(err,client)=>{
                if(err)throw err
                const db=client.db(database)
                console.log("link success")
                const collection=db.collection(collectionName)
                collection.insert(insertData,(err)=>{
                    if(err)reject(err)
                    resolve()
                    client.close();

                })
            })
        })
    },
    "remove":(database,collectionName,removeData)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(mongodbUrl,(err,client)=>{
                if(err)throw err
                const db=client.db(database)
                console.log("'link success")
                const collection=db.collection(collectionName)
                collection.remove(removeData,(err)=>{
                    if(err)reject(err)
                    
                    resolve()
                    client.close()
                })
            })
        })
    },
    "find":(database,collectionName,whereData)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(mongodbUrl,(err,client)=>{
                if(err)throw err
                const db=client.db(database)
                console.log("link success")
                const collection=db.collection(collectionName)
                // console.log(whereData)
                collection.find(whereData).toArray((err,data)=>{
                    if(err)reject(err)
                    resolve(data)
                    client.close()
                })
            })
        })
    },
    "update":(database,collectionName,updateType,whereData,updateData)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(mongodbUrl,(err,client)=>{
                if(err)throw(err)
                const db=client.db(database)
                console.log("link success")
                const collection=db.collection(collectionName)
                collection[updateType](whereData,updateData,(err)=>{
                    if(err)reject(err)
                    resolve();
                    client.close()
                })
            })
        })
    },
    "distinct":(database,collectionName,whereData)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(mongodbUrl,(err,client)=>{
                if(err)throw err
                const db=client.db(database)
                console.log("distinct success")
                const collection=db.collection(collectionName)
                collection.distinct(whereData,(err,data)=>{
                    if(err)throw err
                    resolve(data)
                })
            })
        })
    },

    "sort":(database,collectionName,sortData)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(mongodbUrl,(err,client)=>{
                if(err)throw err
                const db=client.db(database)
                console.log("sort success")
                const collection=db.collection(collectionName)
                collection.find().sort(sortData).toArray((err,data)=>{
                    if(err)throw err
                    resolve(data)
                })
            })
        })
    },
}
module.exports=sql;
