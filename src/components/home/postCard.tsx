import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { homeContent } from '@/content/home/home.content';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  createSubDocument,
  readDocument,
  updateDocumentField,
  deleteDocument,
  readSubDocument,
} from '@/server/firestoreservice';
import { Fancybox } from '@fancyapps/ui';

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

  useEffect(() => {
	Fancybox.bind('[data-fancybox]', {});
  }, [])

  // Function to format timestamp
  const formatTimestamp = (timestamp: string | number) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleLikeClick = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);

    try {
      const postDoc = await readDocument('posts', 'timestamp', post.timestamp);
      await updateDocumentField(
        'posts',
        'likes',
        newLikeCount,
        postDoc[0].docId
      );

      if (isLiked) {
        const userLikeDoc = await readSubDocument(
          'users',
          'userLikes',
          'uniqueID',
          'docId',
          postDoc[0].docId
        );
        await deleteDocument('users', 'userLikes', userLikeDoc[0].subDocId);
      } else {
        const newSubDocData = {
          ...postDoc[0],
          likes: newLikeCount,
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
    <div className="w-full md:w-[70%] lg:w-[50%] bg-[#FAFAFA] border border-gray-300 p-4 shadow-md rounded-xl">
      {/* Header section with user avatar and username */}
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-full border w-10 h-10 border-gray-300">
          <Image src={post.avatar} alt="User Avatar" width={50} height={50} />
        </div>
        <div>
          <h1 className="font-bold text-lg text-[#1A2C1F] overflow-wrap break-word">{post.username}</h1>
          <p className="text-sm text-gray-500 overflow-wrap break-word">{formatTimestamp(post.timestamp)}</p>
        </div>
      </div>
  
      {/* Caption */}
      <h1 className="mb-5 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
        {post.caption}
      </h1>

  
     {/* Content area for post image or text */}
      {post.photo && (
        <div className=" border border-gray-300 h-[200px] lg:h-[400px] rounded-xl">
          <a
            data-fancybox={`image-${post.id}`}
            href={post.photo}
            className=" h-full rounded-xl"
          >
            <Image
              src={post.photo}
              alt="Post Image"
              width={400}
              height={200}
              className="w-full h-full object-cover object-center rounded-xl"
            />
          </a>
        </div>
      )}
  
  
      {/* Interaction section with like icon and count */}
      <div className="flex justify-end gap-2 mt-5">
        <button onClick={handleLikeClick} className="focus:outline-none">
          <Image
            src={isLiked ? homeContent.likeFilled : homeContent.likeIcon}
            width={25}
            alt="Like Icon"
          />
        </button>
        <h1>{likeCount}</h1>
      </div>
    </div>
  );
};

export default PostCard;