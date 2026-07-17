import { associateAllergies, associateCharacteristics, postUser, postDress, postRental } from '@/database/database';
import * as FileSystem from 'expo-file-system/legacy';

const storePicture = async (uri: string) => {
    const fileName = uri.split('/').pop();
    const newPath = `${FileSystem?.documentDirectory}${fileName}`;
    
    await FileSystem.copyAsync({
      from: uri,
      to: newPath
    });
    return newPath;
}

export const addNewUser = async ({ fullName, phone, picture: picturePath, notes, allergies, characteristics }: any) => {
    let picture = null;
    try {
        if (picturePath) {
            picture = await storePicture(picturePath);
        }
        await postUser({ fullName, phone, picture, notes }).then(async (id: any) => {
            await associateAllergies(id, allergies);
            await associateCharacteristics(id, characteristics);
        });
    } catch (error) {
        console.log('error ', error)
        throw new Error('un usuario ya existe con ese telefono')
    }
}

export const addNewDress = async ({ name, image: imagePath, rental_cost }: any) => {
    let picture = null;
    try {
        if (imagePath) {
            picture = await storePicture(imagePath);
        }
        const id = await postDress({
            name,
            image_path: picture,
            is_available: 1,
            rental_cost: rental_cost || null,
        });
        return id;
    } catch (error) {
        console.log('error ', error);
        throw new Error('Error al crear vestido');
    }
}

export const addNewRental = async ({ id_dress, id_user, client_name, rental_date, days }: any) => {
    try {
        const id = await postRental({
            id_dress,
            id_user,
            client_name,
            rental_date,
            days,
        });
        return id;
    } catch (error) {
        console.log('error ', error);
        throw new Error('Error al crear alquiler');
    }
}