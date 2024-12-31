import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase";
import { getCookie } from "@/utils/auth";

export const createDocument = async (collectionName: string, data:any) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    return { ...data }
}

export const createSubDocument = async (collectionName: string, subCollectionName: string, data: any, fieldValue?: string) => {
    const docRef = await readDocument(collectionName, 'uniqueID');
    const documentRef = doc(db, collectionName, docRef[0].id);
    const collectionRef = collection(documentRef, subCollectionName);
    await addDoc(collectionRef, data);
}


export const readDocument = async (collectionName: string, fieldName: string, fieldValue?: string) => {
    const collectionRef = collection(db, collectionName);
    const valueToCompare = fieldValue ?? getCookie(fieldName);
    const que = query(collectionRef, where(fieldName, '==', valueToCompare));
    const querySnapshot = await getDocs(que);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDocumentField = async (collectionName: string, fieldName: string, fieldValue: number, id: string) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
        [fieldName]: fieldValue
    })
}
