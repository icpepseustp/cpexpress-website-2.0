import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import { homeContent } from "@/content/home/home.content"
import Image from "next/image"

const MostLikesPage = () => {
  const { postDetails, addPostIcon } = homeContent;

  const renderPosts = () =>
    postDetails
      .sort((a, b) => b.likes - a.likes) 
      .map((post, index) => (
        <PostCard id={"post.id"} key={index} {...post} />
      ));

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
  );
};

export default MostLikesPage