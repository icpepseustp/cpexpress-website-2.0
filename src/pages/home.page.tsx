import PostCard from "@/components/home/postCard";
import Nav from "@/components/navigation/nav";
import CreatePostPopup from "@/components/home/createPostPopup";
import { homeContent } from "@/content/home/home.content";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkSession, getSessionUser } from "@/utils/auth";
import { db } from "@/server/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// Helper function to get a cookie value by name
const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : undefined;
};

const HomePage = () => {
  const router = useRouter();
  const { addPostIcon } = homeContent;
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  // Check for valid session on component mount
  useEffect(() => {
    if (!checkSession()) {
      router.push('/'); // Redirect to landing if no valid session
      return;
    }
  }, [router]);

  // Real-time listener for posts
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe(); 
  }, []);

  const handleCreatePost = async (post: { caption: string; imageUrl?: string }) => {
    const user = getSessionUser();
    if (!user) {
      router.push('/'); // Redirect to landing if session is invalid
      return;
    }

    try {

      // Create the new post in Firestore
      const newPost = {
        userId: user.userID,
        username: user.username || "",
        likes: 0,
        caption: post.caption,
        photo: post.imageUrl || "",
        timestamp: Date.now(),
      };

      await addDoc(collection(db, "posts"), newPost);

    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const renderPosts = () => posts.map((post) => <PostCard key={post.id} {...post} />);

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
