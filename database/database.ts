import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("db.db");

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
            CREATE TABLE IF NOT EXISTS EYELASH_DRAWING (
                id INTEGER PRIMARY KEY NOT NULL,
                id_user INTEGER,
                type INTEGER NOT NULL,
                data TEXT NOT NULL,
                notes TEXT,
                dateCreated TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE           
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

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS APPOINTMENT (
                id INTEGER PRIMARY KEY NOT NULL,
                id_user INTEGER,
                date TEXT NOT NULL,
                time TEXT,
                title TEXT NOT NULL,
                notes TEXT,
                dateCreated TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (id_user) REFERENCES USER(id) ON DELETE CASCADE
            )
        `)
        console.log("Base de datos inicializada correctamente");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
};

export const initialized = initializeDB();

export const fetchUserByLetter = async (letter: string) => {
    await initialized;
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

export const fetchUsersBySearch = async (query: string) => {
    await initialized;
    const database = await db;
    try {
        const statement = await database.prepareAsync(
          'SELECT * FROM USER WHERE full_name LIKE $pattern OR phone LIKE $pattern2 ORDER BY full_name ASC LIMIT 10'
        );
        
        const result = await statement.executeAsync({
          $pattern: `%${query}%`,
          $pattern2: `%${query}%`,
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
    await initialized;
    const database = await db;
    try {
        const userAllergies = await database.getAllAsync(`SELECT a.name AS allergy_name
              FROM USER u
              JOIN ALLERGY_USER ua ON u.id = ua.id_user
              JOIN ALLERGY a ON ua.id_allergy = a.id
              WHERE u.id = ${id};`);
        return userAllergies;
    } catch (error) {
        console.log(error)
    }
};

export const fetchUserCharacteristics = async (id: number) => {
    await initialized;
    const database = await db;
    try {
        const userAllergies = await database.getAllAsync(`SELECT c.name AS characteristic_name
              FROM USER u
              JOIN CHARACTERISTIC_USER uc ON u.id = uc.id_user
              JOIN CHARACTERISTIC c ON uc.id_characteristic = c.id
              WHERE u.id = ${id};`);
        return userAllergies;
    } catch (error) {
        console.log(error)
    }
};

export const fetchSingleUser = async (id: number) => {
    await initialized;
    const database = await db;
    const user = await database.getAllAsync(`SELECT * FROM USER WHERE id = ${id}`);
    return user[0];
};

export const fetchSingleAllergy = async (id: number) => {
    await initialized;
    const database = await db;
    const allergy = await database.getAllAsync(`SELECT * FROM ALLERGY WHERE id = ${id}`);
    return allergy;
};

export const fetchSingleCharacteristic = async (id: number) => {
    await initialized;
    const database = await db;
    const characteristic = await database.getAllAsync(`SELECT * FROM CHARACTERISTIC WHERE id = ${id}`);
    return characteristic;
};

export const fetchAllergies = async () => {
    await initialized;
    const database = await db;
    const allergies = await database.getAllAsync('SELECT * FROM ALLERGY');
    return allergies;
};

export const fetchCharacteristics = async () => {
    await initialized;
    const database = await db;
    const characteristics = await database.getAllAsync('SELECT * FROM CHARACTERISTIC');
    return characteristics;
};

export const fetchDrawing = async (user: number) => {
    await initialized;
    const database = await db;
    try {
      const drawing = await database.getAllAsync(
        `SELECT * FROM EYELASH_DRAWING WHERE id_user = ${user} ORDER BY dateCreated DESC LIMIT 1`
      );
      return drawing[0];
    } catch (error) {
      console.log(error);
    }
  };

export const updateUser = async (user: any) => {
    await initialized;
    const { id, full_name, notes, phone, picture_path } = user;
    const database = await db;
    
    let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        `UPDATE USER
        SET full_name = $full_name,
            phone = $phone,
            notes = $notes,
            picture_path = $picture_path
        WHERE id = $id`
    )

    try {
        const result = await statement.executeAsync({
            $full_name: full_name,
            $phone: phone,
            $notes: notes,
            $id: id,
            $picture_path: picture_path
        });
        return result;
    } catch (error) {
        console.log('error', error);
        throw error;
    } finally {
        await statement.finalizeAsync();
    }
}

export const postUser = async (user: any) => {
    await initialized;
    const { fullName: full_name, phone, picture: picture_path, notes } = user;
    const database = await db;

    let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO USER (full_name, phone, picture_path, notes) VALUES ($full_name, $phone, $picture_path, $notes)'
    );

    try {
        const result = await statement.executeAsync({ $full_name: full_name, $phone: phone, $picture_path: picture_path, $notes: notes });
        return result.lastInsertRowId;
    } catch (error: any) {
        console.log('error', error )
        throw new Error(error);
    } finally {
        await statement.finalizeAsync();
    }
};

export const addDrawing = async (drawingInfo: any) => {
    await initialized;
    const { userId: id_user , selected: type, drawing: data, notes } = drawingInfo;
    const database = await db;

    let statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO EYELASH_DRAWING (id_user, type, data, notes) VALUES ($id_user, $type, $data, $notes)'
    );

    try {
        const result = await statement.executeAsync({ $id_user: id_user, $type: type, $data: data, $notes: notes });
        return result.lastInsertRowId;
    } catch (error: any) {
        console.log('ERROR ', error)
        throw new Error(error);
    } finally {
        await statement.finalizeAsync();
    }
};

export const associateAllergies = async (user: number, allergies: object[]) => {
    await initialized;
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
    await initialized;
    const database = await db;

  try {
    await database.execAsync('BEGIN TRANSACTION');

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

    await database.execAsync('COMMIT');
  } catch (error) {
    console.error('Error en associateCharacteristics:', error);
    await database.execAsync('ROLLBACK');
    throw error;
  }
};

export const postAllergy = async (name: any) => {
    await initialized;
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
    await initialized;
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

export const fetchAppointmentsForDate = async (date: string) => {
    await initialized;
    const database = await db;
    try {
        const appointments = await database.getAllAsync(
            `SELECT a.*, u.full_name 
             FROM APPOINTMENT a 
             LEFT JOIN USER u ON a.id_user = u.id 
             WHERE a.date = $date 
             ORDER BY a.time ASC`,
            { $date: date }
        );
        return appointments;
    } catch (error) {
        console.error('Error al buscar citas:', error);
        throw error;
    }
};

export const fetchAppointmentsForMonth = async (year: number, month: number) => {
    await initialized;
    const database = await db;
    try {
        const monthStr = month.toString().padStart(2, '0');
        const startDate = `${year}-${monthStr}-01`;
        const endDate = `${year}-${monthStr}-31`;
        const appointments = await database.getAllAsync(
            `SELECT a.*, u.full_name 
             FROM APPOINTMENT a 
             LEFT JOIN USER u ON a.id_user = u.id 
             WHERE a.date >= $startDate AND a.date <= $endDate
             ORDER BY a.date ASC, a.time ASC`,
            { $startDate: startDate, $endDate: endDate }
        );
        return appointments;
    } catch (error) {
        console.error('Error al buscar citas del mes:', error);
        throw error;
    }
};

export const fetchAllAppointments = async () => {
    await initialized;
    const database = await db;
    try {
        const appointments = await database.getAllAsync(
            `SELECT a.*, u.full_name 
             FROM APPOINTMENT a 
             LEFT JOIN USER u ON a.id_user = u.id 
             ORDER BY a.date ASC, a.time ASC`
        );
        return appointments;
    } catch (error) {
        console.error('Error al buscar todas las citas:', error);
        throw error;
    }
};

export const postAppointment = async (appointment: any) => {
    await initialized;
    const { id_user, date, time, title, notes } = appointment;
    const database = await db;

    const statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'INSERT INTO APPOINTMENT (id_user, date, time, title, notes) VALUES ($id_user, $date, $time, $title, $notes)'
    );

    try {
        const result = await statement.executeAsync({
            $id_user: id_user || null,
            $date: date,
            $time: time || null,
            $title: title,
            $notes: notes || null
        });
        return result.lastInsertRowId;
    } catch (error: any) {
        console.error('Error al crear cita:', error);
        throw new Error(error);
    } finally {
        await statement.finalizeAsync();
    }
};

export const deleteAppointment = async (id: number) => {
    await initialized;
    const database = await db;
    const statement: SQLite.SQLiteStatement = await database.prepareAsync(
        'DELETE FROM APPOINTMENT WHERE id = $id'
    );

    try {
        await statement.executeAsync({ $id: id });
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        throw error;
    } finally {
        await statement.finalizeAsync();
    }
};