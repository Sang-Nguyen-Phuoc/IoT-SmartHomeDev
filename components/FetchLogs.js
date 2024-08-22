import { ref, get } from 'firebase/database';
import { database } from '@/firebase';

export const fetchData = async (collection) => {
    try {
        const dbRef = ref(database, collection);
        const snapshot = await get(dbRef);
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
