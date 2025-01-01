import { homeContent } from "@/content/home/home.content";
import Image from "next/image";
import { useState } from 'react';
import { createSubDocument, readDocument, updateDocumentField, deleteDocument, readSubCollection, readSubDocument } from "@/server/firestoreservice";

interface PostDocument {
    id: string;
    username: string;
    avatar: string;
    caption: string;
    photo: string;
    likes: number;
    timestamp: string;
    liked: boolean;
}

/**
 * PostCard component represents a user's post with a header, content area, and interaction icons.
 */
const PostCard = ({ liked, ...post }: PostDocument) => {
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(liked);

    const handleLikeClick = async () => {
        const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);
        setIsLiked(!isLiked);

        try {
            const postDoc = await readDocument('posts', 'timestamp', post.timestamp);
            await updateDocumentField('posts', 'likes', newLikeCount, postDoc[0].docId);

            if (isLiked) {
                const userLikeDoc = await readSubDocument('users', 'userLikes', 'uniqueID', 'docId', postDoc[0].docId);
                await deleteDocument('users', 'userLikes', userLikeDoc[0].subDocId);
            } else {
                const newSubDocData = {
                    ...postDoc[0],
                    likes: newLikeCount
                };
                await createSubDocument('users', 'userLikes', newSubDocData);
            }
        } catch (error) {
            console.error('Error updating like count:', error);
            setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
            setIsLiked(!isLiked);
        }
    };

    return (
        <div className="w-full md:w-[70%] lg:w-[50%] border-2 border-black px-5 py-3 shadow-2xl">
            {/* Header section with user avatar and username */}
            <div className="flex items-center gap-3 mb-5">
                <div className="rounded-full border-2 w-7 h-7 border-black">
                    <Image src={post.avatar} alt="User Avatar" width={50} height={50} />
                </div>
                <h1>{post.username}</h1>
            </div>

            {/* Caption */}
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
                    <Image src={isLiked ? homeContent.likeFilled : homeContent.likeIcon} width={25} alt="Like Icon" />
                </button>
                <h1>{likeCount}</h1>
            </div>
        </div>
    );
};

export default PostCard;