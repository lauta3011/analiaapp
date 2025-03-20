import * as SQLite from "expo-sqlite";

// Abrir la base de datos
const db = SQLite.openDatabaseAsync("db.db");

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
                allergyName TEXT NOT NULL
            )
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS ALLERGY_USER (
                idUser INTEGER,
                idAllergy INTEGER,
                fechaAsignacion TEXT DEFAULT (datetime('now')),
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

export const postUser = async (form: any) => {
    console.log('#### h')
    const { fullName, phone } = form;

    const database = await db;
    let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO USER (fullName, phone) VALUES ($fullName, $phone)'
    );; 
    try {
        console.log('Statement preparado');
        const result = await statement.executeAsync({ $fullName: fullName, $phone: phone });
        console.log('Resultado de la ejecución:', result.lastInsertRowId, result.changes);
    } catch (error) {
        console.error('Error en postUser:', error);
    } finally {
        await statement.finalizeAsync();
        console.log('Statement finalizado');
    }
};