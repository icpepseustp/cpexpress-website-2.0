import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import { homeContent } from "@/content/home/home.content"
import Image from "next/image"
import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../server/firebase";

interface Post {
  id: string;
  username: string;
  likes: number;
  caption: string;
  photo: string;
}

const MostLikesPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const { addPostIcon } = homeContent

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, orderBy("likes", "desc"));
        const querySnapshot = await getDocs(q);
        const mostLikedPosts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username || '',
            likes: data.likes || 0,
            caption: data.caption || '',
            photo: data.photo || ''
          };
        });
        setPosts(mostLikedPosts);
      } catch (error) {
        console.error('Error fetching most liked posts:', error);
      }
    };
    getPosts();
  }, [])

  const renderPosts = () =>
    posts.map((post, index) => (
      <PostCard id = {post.id} username={post.username} likes={post.likes} caption={post.caption} photo={post.photo} key={post.id} />
    ))

  return (
    <>
      <Nav />
      <div className="w-full pt-[10.2vh] flex flex-col gap-12 py-16 items-center">
        {renderPosts()}

        <div className="fixed right-5 bottom-7 flex flex-col gap-5">
          <button className="border-2 rounded-full border-black p-3">
            <Image src={addPostIcon} width={35} alt="Add Post" />
          </button>
        </div>
      </div>
    </>
  )
}

export default MostLikesPage