import * as SQLite from "expo-sqlite";

// Abrir la base de datos
const db = SQLite.openDatabaseAsync("db2.db");

// Función para inicializar la base de datos
const initializeDB = async () => {
    try {
        const database = await db;

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS USER (
                id INTEGER PRIMARY KEY NOT NULL,
                fullName TEXT NOT NULL,
                phone TEXT NOT NULL,
                other TEXT
            )
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS ALLERGY (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL
            )
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS CHARACTERISTIC (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL
            )
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS ALLERGY_USER (
                idUser INTEGER,
                idAllergy INTEGER,
                dateCreated TEXT DEFAULT (datetime('now')),
                PRIMARY KEY (idUser, idAllergy),
                FOREIGN KEY (idUser) REFERENCES usuarios(idUser) ON DELETE CASCADE,
                FOREIGN KEY (idAllergy) REFERENCES tags(idAllergy) ON DELETE CASCADE
            )    
        `)
        console.log("Base de datos inicializada correctamente");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
};

initializeDB();

export const fetchIndividualAllergy = async (id: number) => {
    const database = await db;
    const allergy = await database.getAllAsync(`SELECT * FROM ALLERGY WHERE id = ${id}`);
    return allergy;
};

export const fetchIndividualCharacteristic = async (id: number) => {
    const database = await db;
    const characteristic = await database.getAllAsync(`SELECT * FROM CHARACTERISTIC WHERE id = ${id}`);
    return characteristic;
};

export const fetchAllergies = async () => {
    const database = await db;
    const allergies = await database.getAllAsync('SELECT * FROM ALLERGY');
    return allergies;
};

export const fetchCharacteristics = async () => {
    const database = await db;
    const characteristics = await database.getAllAsync('SELECT * FROM CHARACTERISTIC');
    return characteristics;
};

export const postAllergy = async (name: any) => {
    const database = await db;
        let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO ALLERGY (name) VALUES ($name)'
    ); 
    try {
        const result = await statement.executeAsync({ $name: name });
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Error en addAlergy:', error);
    } finally {
        await statement.finalizeAsync();
    }
};

export const postCharacteristic = async (name: any) => {
    const database = await db;
        let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO CHARACTERISTIC (name) VALUES ($name)'
    ); 
    try {
        const result = await statement.executeAsync({ $name: name });
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Error en addAlergy:', error);
    } finally {
        await statement.finalizeAsync();
    }
};

export const postUser = async (form: any) => {
    const { fullName, phone } = form;

    const database = await db;
    let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO USER (fullName, phone) VALUES ($fullName, $phone)'
    );

    try {
        const result = await statement.executeAsync({ $fullName: fullName, $phone: phone });
    } catch (error) {
        console.error('Error en postUser:', error);
    } finally {
        await statement.finalizeAsync();
    }
};