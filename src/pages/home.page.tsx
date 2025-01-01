import PostCard from "@/components/home/postCard";
import Nav from "@/components/navigation/nav";
import CreatePostPopup from "@/components/home/createPostPopup";
import { homeContent } from "@/content/home/home.content";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/utils/auth";
import { db } from "@/server/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { readSubCollection } from "@/server/firestoreservice";


const HomePage = () => {
  const router = useRouter();
  const { addPostIcon } = homeContent;
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [isLikesFetched, setIsLikesFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!checkSession()) {
      router.push('/');
      return;
    }
  }, [router]);

  // Real-time listener for posts
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), async (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as any));
      
      fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  // Fetch likes from sub-collection
  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = await readSubCollection('users', 'userLikes');
      setLikes(likesData);
      setIsLikesFetched(true);
      console.log('Likes:', likesData);
    };

    fetchLikes();
  }, []);

  const renderPosts = () => {
    return posts.map((post) => {
      const isLiked = likes.some((like) => like.docId === post.id);
      console.log(isLiked);
      
      return <PostCard key={post.id} {...post} liked={isLiked} />;
    });
  };

  return (
    <div className="relative">
      <Nav />
      <div className="w-full pt-[10.2vh] flex flex-col gap-12 py-16 items-center">
        {isLikesFetched && renderPosts()}
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
      />
    </div>
  );
};

export default HomePage;