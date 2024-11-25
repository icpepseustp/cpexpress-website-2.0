import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import CreatePostPopup from "@/components/home/createPostPopup"
import { homeContent } from "@/content/home/home.content"
import Image from "next/image"
import { useState } from "react"

const HomePage = () => {
  const { postDetails, addPostIcon } = homeContent;
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = async (post: { caption: string; photo?: string }) => {
    // TODO: Implement post creation logic with Firebase
    console.log('Creating post:', post);
  };

  const renderPosts = () =>
    postDetails
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