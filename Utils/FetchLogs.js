import { ref, get } from 'firebase/database';
import { database } from '@/firebase';

export const fetchData = async (collection) => {
    try {
        const dbRef = ref(database, collection); // Create a reference to the database using the collection path provided
        const snapshot = await get(dbRef); // Fetch data from the database using the reference path provided and store it in a snapshot. 
        if (snapshot.exists()) {
            const data = snapshot.val();
            const logsArray = data && Object.keys(data).map((key) => {
                return {
                    id: key,
                    ...data[key],
                };
            });
            logsArray.reverse();
            return logsArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};
