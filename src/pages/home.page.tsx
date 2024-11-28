import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import CreatePostPopup from "@/components/home/createPostPopup"
import { homeContent } from "@/content/home/home.content"
import Image from "next/image"
import { useState, useEffect } from "react"
import { db } from "@/server/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const HomePage = () => {
  const { postDetails, addPostIcon } = homeContent;
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState(postDetails);

  const handleCreatePost = async (post: { caption: string; imageUrl?: string }) => {
    // Simulate post creation logic
    console.log('Creating post:', post);
    // Update the posts state with the new post, ensuring all required fields are present
    const newPost = {
      username: 'defaultUser', // Default username
      likes: 0, // Default likes
      caption: post.caption,
      photo: post.imageUrl || '',
      timestamp: Date.now(),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    // Save the new post to Firestore
    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          username: data.username || '',
          likes: data.likes || 0,
          caption: data.caption || '',
          photo: data.photo || '',
          timestamp: data.timestamp || Date.now()
        };
      });
      setPosts(postsArray);
    };
    fetchPosts();
  }, []);

  const renderPosts = () =>
    posts
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((post, index) => (
        <PostCard key={index} {...post} />
      ));

  return (
    <div className="relative">
      <Nav />
      <div className="w-full pt-[10.2vh] flex flex-col gap-12 py-16 items-center">
        {renderPosts()}

        <div className="fixed right-5 bottom-7 flex flex-col gap-5">
          <button 
            className="border-2 rounded-full border-black p-3 hover:bg-gray-100 transition-colors"
            onClick={() => setIsCreatePostOpen(true)}
          >
            <Image src={addPostIcon} width={35} alt="Add Post" />
          </button>
        </div>
      </div>

      <CreatePostPopup
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default HomePage