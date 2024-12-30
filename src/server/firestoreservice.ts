import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from "./firebase";

export const createDocument = async (collectionName: string, data:any) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    return { ...data }
}
