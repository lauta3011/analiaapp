import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("database.db");

const initDB = () => {
    db.execAsync(`
        CREATE TABLE IF NOT EXISTS 
        User (id INTEGER PRIMARY KEY NOT NULL, fullName TEXT NOT NULL, phone TEXT NOT NULL, allergies TEXT, eyeProducts TEXT, contactLenses BOOLEAN NOT NULL, glasses BOOLEAN NOT NULL, eyeProblems BOOLEAN NOT NULL CHECK (contactLenses IN (0, 1), glasses IN (0, 1), eyeProblems IN (0, 1))
    `)
}

export const postUser = async({ name, phone }: any) => {
    const statement = await db.prepareAsync('INSERT INTO User (fullName, phone) VALUES ($fullName, $phone)')
    try {
        let result = await statement.executeAsync({ $fullName: name, $phone: phone });
        console.log('bbb and 101:', result.lastInsertRowId, result.changes);
    } catch (error) {
        console.log('error ', error)
    } finally {
        await statement.finalizeAsync();
    }
}

initDB();

export default db;
