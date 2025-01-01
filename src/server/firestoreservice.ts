import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase";
import { getCookie } from "@/utils/auth";

export const createDocument = async (collectionName: string, data:any) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    return { ...data }
}

export const createSubDocument = async (collectionName: string, subCollectionName: string, data: any) => {
    const docRef = await readDocument(collectionName, 'uniqueID');
    const collectionRef = collection(db, collectionName, docRef[0].docId, subCollectionName);
    await addDoc(collectionRef, data);
}

export const readDocument = async (collectionName: string, fieldName: string, fieldValue?: string) => {
    const collectionRef = collection(db, collectionName);
    const valueToCompare = fieldValue ?? getCookie(fieldName);
    const que = query(collectionRef, where(fieldName, '==', valueToCompare));
    const querySnapshot = await getDocs(que);

    return querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
};

export const readSubDocument = async (collectionName: string, subCollectionName: string, fieldName: string, subDocFieldName: string, fieldValue: string) => {
    const docRefs = await readDocument(collectionName, fieldName);
    docRefs.length === 0 && (() => {throw new Error(`No documents found in collection ${collectionName} with ${fieldName}`)})
    
    const docRef = docRefs[0];
    const subCollectionRef = collection(db, collectionName, docRef.docId, subCollectionName);
    const que = query(subCollectionRef, where(subDocFieldName, '==', fieldValue));
    const querySnapshot = await getDocs(que);

    return querySnapshot.docs.map((doc) => ({ subDocId: doc.id, ...doc.data() }));
};

export const readSubCollection = async (collectionName: string, subCollectionName: string) => {
    const docRefs = await readDocument(collectionName, 'uniqueID');
    docRefs.length === 0 && (() => {throw new Error(`No documents found in collection ${collectionName} with uniqueID`)})

    const docRef = docRefs[0]; 
    const subCollectionRef = collection(db, collectionName, docRef.docId, subCollectionName);
    const querySnapshot = await getDocs(subCollectionRef);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDocumentField = async (collectionName: string, fieldName: string, fieldValue: number, docId: string) => {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
        [fieldName]: fieldValue
    })
}

export const deleteDocument = async (collectionName: string, subCollectionName: string, docId: string) => {
    const parentDoc = await readDocument(collectionName, 'uniqueID');
    await deleteDoc(doc(db, collectionName, parentDoc[0].docId, subCollectionName, docId));
};