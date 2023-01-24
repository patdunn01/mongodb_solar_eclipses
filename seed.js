const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://patdunn01:blackoutcrew@eclipsescluster.uzifmur.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "test";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("people");

         // Construct a document                                                                                                                                                              
         const seedEclipses = {
          eclipses: [
          { 
            date: "1940Apr07",
            time: "21:45",
            pathWidth: "245",
            centerDuration: "06m29.9s",
            northCoordinates: { latitude: 30.8003, longitude: -100.3347 },
            centerCoordinates: { latitude: 29.6678, longitude: -100.3517 },
            southCoordinates: { latitude: 28.5506, longitude: -100.3508 },
          }
         ]}
            
          

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(seedEclipses);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
