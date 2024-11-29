 import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../server/firebase";

export const fetchMostLikedPosts = async () => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("likes", "desc"));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return posts;
  } catch (error) {
    console.error("Error fetching most liked posts: ", error);
    return [];
  }
};