import * as SQLite from "expo-sqlite";

// Abrir la base de datos
const db = SQLite.openDatabaseAsync("db5.db");

// Función para inicializar la base de datos
const initializeDB = async () => {
    try {
        const database = await db;

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS USER (
                id INTEGER PRIMARY KEY NOT NULL,
                full_name TEXT NOT NULL,
                phone TEXT UNIQUE NOT NULL,
                picture_path TEXT,
                notes TEXT
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
                id_user INTEGER,
                id_allergy INTEGER,
                dateCreated TEXT DEFAULT (datetime('now')),
                PRIMARY KEY (id_user, id_allergy),
                FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE,
                FOREIGN KEY (id_allergy) REFERENCES ALLERGY(id_allergy) ON DELETE CASCADE
            )    
        `)

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS CHARACTERISTIC_USER (
                id_user INTEGER,
                id_characteristic INTEGER,
                dateCreated TEXT DEFAULT (datetime('now')),
                PRIMARY KEY (id_user, id_characteristic),
                FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE,
                FOREIGN KEY (id_characteristic) REFERENCES CHARACTERISTIC(id_characteristic) ON DELETE CASCADE
            )    
        `)
        console.log("Base de datos inicializada correctamente");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
};

initializeDB();

export const fetchUserByLetter = async (letter: string) => {
    const database = await db;
    try {
        if (letter.length !== 1 || !letter.match(/[a-z]/i)) {
          throw new Error('Debe proporcionar una sola letra válida');
        }
    
        const statement = await database.prepareAsync(
          'SELECT * FROM USER WHERE full_name LIKE $pattern ORDER BY full_name ASC'
        );
        
        const result = await statement.executeAsync({
          $pattern: `${letter}%`
        });
        
        const users = await result.getAllAsync();
        await statement.finalizeAsync();
        return users;
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        throw error;
      }
}

export const fetchUserAllergies = async (id: number) => {
    const database = await db;
    const userAllergies = await database.getAllAsync(`SELECT * FROM ALLERGY_USER WHERE id_user = ${id}`);
    return userAllergies;
};

export const fetchSingleUser = async (id: number) => {
    const database = await db;
    const user = await database.getAllAsync(`SELECT * FROM USER WHERE id = ${id}`);
    return user[0];
};

export const fetchSingleAllergy = async (id: number) => {
    const database = await db;
    const allergy = await database.getAllAsync(`SELECT * FROM ALLERGY WHERE id = ${id}`);
    return allergy;
};

export const fetchSingleCharacteristic = async (id: number) => {
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

export const postUser = async (user: any) => {
    const { fullName: full_name, phone, picture: picture_path, notes } = user;
    const database = await db;

    let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO USER (full_name, phone, picture_path, notes) VALUES ($full_name, $phone, $picture_path, $notes)'
    );

    try {
        const result = await statement.executeAsync({ $full_name: full_name, $phone: phone, $picture_path: picture_path, $notes: notes });
        return result.lastInsertRowId;
    } catch (error: any) {
        throw new Error(error);
    } finally {
        await statement.finalizeAsync();
    }
};

export const associateAllergies = async (user: number, allergies: object[]) => {
    const database = await db;

    try {
        if (allergies.length > 0) {
            const associationStatement = await database.prepareAsync(
              'INSERT INTO ALLERGY_USER (id_user, id_allergy) VALUES ($id_user, $id_allergy)'
            );
            await Promise.all(
                allergies.map(async (item: any) => {
                await associationStatement.executeAsync({
                  $id_user: user,
                  $id_allergy: item.id
                });
              })
            );
            await associationStatement.finalizeAsync();
        }
    } catch (error) {
        console.error('Error en associateAllergies:', error);
        return error;  
    }
}

export const associateCharacteristics = async (user: number, allergies: object[]) => {
    const database = await db;

    try {
        if (allergies.length > 0) {
            const associationStatement = await database.prepareAsync(
              'INSERT INTO CHARACTERISTIC_USER (id_user, id_characteristic) VALUES ($id_user, $id_characteristic)'
            );
            await Promise.all(
                allergies.map(async (item: any) => {
                await associationStatement.executeAsync({
                  $id_user: user,
                  $id_characteristic: item.id
                });
              })
            );
            await associationStatement.finalizeAsync();
        }
    } catch (error) {
        console.error('Error en associateCharacteristics:', error);
        return error;  
    }
}

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