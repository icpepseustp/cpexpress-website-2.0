import { homeContent } from "@/content/home/home.content"
import Image from "next/image"

interface PostCardProps {
    username: string,
    likes: number,
    caption: string,
    photo: string
}

/**
 * PostCard component represents a user's post with a header, content area, and interaction icons.
 */
const PostCard = ({ username, likes, caption, photo }: PostCardProps) => {
    return (
        <div className="w-full md:w-[70%] lg:w-[50%] border-2 border-black px-5 py-3 shadow-2xl">
            {/* Header section with user avatar and username */}
            <div className="flex items-center gap-3 mb-5">
                <div className="rounded-full border-2 w-7 h-7 border-black">
                    {/* TODO: Add user avatar image */}
                </div>
                <h1>{username}</h1>
            </div>

            {/* caption */}
            <h1 className="mb-5">{caption}</h1>

            {/* Content area for post image or text */}
            <div className="border-black border-2 h-[200px] lg:h-[400px] rounded-xl">
                {/* TODO: Add post content image */}
            </div>

            {/* Interaction section with like icon and count */}
            <div className="flex justify-end gap-2 mt-5">
                <Image src={homeContent.likeIcon} width={25} alt="Like Icon" />
                <h1>{likes}</h1>
            </div>
        </div>
    )
}

export default PostCard 