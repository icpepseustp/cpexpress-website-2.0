import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase";
import { getCookie } from "@/utils/auth";

export const createDocument = async (collectionName: string, data:any) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    return { ...data }
}

export const readDocument = async (collectionName: string, fieldName: string) => {
    const collectionRef = collection(db, collectionName)
    const fieldValue = getCookie(fieldName); 
    const que = query(collectionRef, where(fieldName, '==', fieldValue));
    const querySnapshot = await getDocs(que);

    return querySnapshot.docs.map((doc) => doc.data());
}
