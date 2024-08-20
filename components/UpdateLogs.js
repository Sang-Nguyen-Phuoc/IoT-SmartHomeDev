import { database } from '@/firebase';
import { ref, set } from 'firebase/database';

export const updateLogs = async (collection, id, data) => {
    try {
        const dbRef = ref(database, `${collection}/${id}`);
        await set(dbRef, data);
    } catch (error) {
        console.error("Error updating logs: ", error);
    }
};
