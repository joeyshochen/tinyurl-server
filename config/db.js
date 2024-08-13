import { MongoClient } from "mongodb";

const connectionStringMongoDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@tinyurl.v9gjwpw.mongodb.net/?retryWrites=true&w=majority&appName=tinyUrl`;
const client = new MongoClient(connectionStringMongoDB);
let conn;

try {
	conn = await client.connect();
} catch (e) {
	console.error(e);
}
let db = conn.db("metadata");
export default db;
