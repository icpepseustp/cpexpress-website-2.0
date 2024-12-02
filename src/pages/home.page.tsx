import PostCard from "@/components/home/postCard";
import Nav from "@/components/navigation/nav";
import CreatePostPopup from "@/components/home/createPostPopup";
import { homeContent } from "@/content/home/home.content";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkSession, getSessionUser } from "@/utils/auth";
import { db } from "@/server/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Helper function to get a cookie value by name
const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : undefined;
};

const HomePage = () => {
  const router = useRouter();
  const { postDetails, addPostIcon } = homeContent;
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState(postDetails.map(post => ({ ...post, id: post.username })));

  // Check for valid session on component mount
  useEffect(() => {
    if (!checkSession()) {
      router.push('/'); // Redirect to landing if no valid session
      return;
    }
  }, [router]);

  const handleCreatePost = async (post: { caption: string; imageUrl?: string }) => {
    const user = getSessionUser();
    if (!user) {
      router.push('/'); // Redirect to landing if session is invalid
      return;
    }

    // Create the new post object
    const newPost = {
      id: "", // Placeholder ID to match the required type
      username: user.username || "", // Ensure username is always a string
      likes: 0,
      caption: post.caption,
      photo: post.imageUrl || "",
      timestamp: Date.now(),
    };

    // Update the local state with the new post
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    // Save the new post to Firestore
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        id: "", // Placeholder ID to match the required type
        username: user.username || "", // Ensure username is always a string
        likes: 0,
        caption: post.caption,
        photo: post.imageUrl || "",
        timestamp: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);

      // Update the ID with the Firestore document ID
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.timestamp === newPost.timestamp ? { ...p, id: docRef.id } : p
        )
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: data.username || "",
          likes: data.likes || 0,
          caption: data.caption || "",
          photo: data.photo || "",
          timestamp: data.timestamp || Date.now(),
        };
      });
      setPosts(postsArray);
    };
    fetchPosts();
  }, []);

  const renderPosts = () =>
    posts
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((post) => <PostCard key={post.id} {...post} />);

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

export default HomePage;
