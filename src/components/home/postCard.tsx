import { homeContent } from "@/content/home/home.content"
import Image from "next/image"
import { useState } from 'react'
import { createSubDocument, readDocument, updateDocumentField } from "@/server/firestoreservice";

interface PostDocument {
    id: string;
    username: string;
    avatar: string;
    caption: string;
    photo: string;
    likes: number;
    timestamp: string;
}

/**
 * PostCard component represents a user's post with a header, content area, and interaction icons.
 */
const PostCard = ({ ...post }: PostDocument) => {
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLikeClick = async () => {
        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);

        try {
            const postDoc = await readDocument('posts', 'timestamp', post.timestamp);
            
            await updateDocumentField('posts', 'likes', newLikeCount, postDoc[0].id); 
            await createSubDocument('users', 'userLikes', postDoc[0]);
            
        } catch (error) {
            console.error('Error updating like count:', error);
            // Revert the like count if update fails
            setLikeCount(newLikeCount - 1);
        }
    };

    return (
        <div className="w-full md:w-[70%] lg:w-[50%] border-2 border-black px-5 py-3 shadow-2xl">
            {/* Header section with user avatar and username */}
            <div className="flex items-center gap-3 mb-5">
                <div className="rounded-full border-2 w-7 h-7 border-black">
                    <Image src={post.avatar} alt="User Avatar" width={50} height={50}/>
                </div>
                <h1>{post.username}</h1>
            </div>

            {/* caption */}
            <h1 className="mb-5">{post.caption}</h1>

            {/* Content area for post image or text */}
            {post.photo && (
                <div className="border-black border-2 h-[200px] lg:h-[400px] rounded-xl">
                    <Image src={post.photo} alt="Post Image" width={400} height={200} className="w-full h-full object-cover object-center rounded-xl" />
                </div>
            )}

            {/* Interaction section with like icon and count */}
            <div className="flex justify-end gap-2 mt-5">
                <button onClick={handleLikeClick} className="focus:outline-none">
                    <Image src={homeContent.likeIcon} width={25} alt="Like Icon" />
                </button>
                <h1>{likeCount}</h1>
            </div>
        </div>
    )
}

export default PostCard