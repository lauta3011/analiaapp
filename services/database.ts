import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("database.db");

const initDB = () => {
    db.execAsync(`
        CREATE TABLE IF NOT EXISTS 
        User (id INTEGER PRIMARY KEY NOT NULL, fullName TEXT NOT NULL, phone TEXT NOT NULL, allergies TEXT, eyeProducts TEXT, contactLenses BOOLEAN NOT NULL, glasses BOOLEAN NOT NULL, eyeProblems BOOLEAN NOT NULL CHECK (contactLenses IN (0, 1), glasses IN (0, 1), eyeProblems IN (0, 1))
    `)
}

initDB();

export default db;
