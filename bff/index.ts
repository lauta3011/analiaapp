import { associateAllergies, associateCharacteristics, postUser } from '@/database/database';
import * as FileSystem from 'expo-file-system';

const storePicture = async (uri: string) => {
    const fileName = uri.split('/').pop();
    const newPath = `${FileSystem?.documentDirectory}${fileName}`;
    
    await FileSystem.copyAsync({
      from: uri,
      to: newPath
    });
    return newPath;
}

export const addNewUser = async ({ fullName, phone, picture: picturePath, allergies, characteristics }: any) => {
    let picture = null;
    try {
        if (picturePath) {
            picture = await storePicture(picturePath);
        }
        await postUser({ fullName, phone, picture }).then(async (id: any) => {
            await associateAllergies(id, allergies);
            await associateCharacteristics(id, characteristics);
        });
    } catch (error) {
        throw new Error('un usuario ya existe con ese telefono')
    }
}