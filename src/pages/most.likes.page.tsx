import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import { homeContent } from "@/content/home/home.content"
import Image from "next/image"
import { useEffect, useState } from "react"
import { fetchMostLikedPosts } from "../content/mostlikes/mostlikes.content"

interface Post {
  id: string;
  // Add other properties as needed
}

const MostLikesPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const { addPostIcon } = homeContent

  useEffect(() => {
    const getPosts = async () => {
      const mostLikedPosts = await fetchMostLikedPosts()
      setPosts(mostLikedPosts)
    }
    getPosts()
  }, [])

  const renderPosts = () =>
    posts.map((post, index) => (
      <PostCard key={index} {...post} />
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