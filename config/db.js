import { MongoClient } from "mongodb";
import { connectionStringMongoDB } from "../config.js";

const connectionString = connectionStringMongoDB || "";
const client = new MongoClient(connectionString);
let conn;

try {
        conn = await client.connect();
} catch(e) {
        console.error(e);
}
let db = conn.db("metadata");
export default db;