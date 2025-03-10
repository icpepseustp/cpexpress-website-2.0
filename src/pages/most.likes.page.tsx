'use client'

import PostCard from '@/components/home/postCard';
import Nav from '@/components/navigation/nav';
import CreatePostPopup from '@/components/home/createPostPopup';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession } from '@/utils/auth';
import { db } from '@/server/firebase';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { readCollection, readDocument, readSubCollection } from '@/server/firestoreservice';
import { HiPlusCircle } from 'react-icons/hi2';

const MostLikesPage = () => {
	const router = useRouter();
	const currRoute = usePathname()
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

	useEffect(() => {

		const fetchAllPosts = async () => {
			const normalPosts = await readCollection('posts');
			const concernPosts = await readCollection('concernPosts');

			const combinedPosts = [...normalPosts, ...concernPosts];
			combinedPosts.sort((a, b) => b.timesetamp - a.timesetamp);
			setPosts(combinedPosts)
		}
		fetchAllPosts()
	  }, []);

	// Fetch likes from sub-collection
	useEffect(() => {
		const fetchLikes = async () => {
			const likesData = await readSubCollection('users', 'userLikes');
			setLikes(likesData);
			setIsLikesFetched(true);
		};

		fetchLikes();
	}, []);

	const renderPosts = () => {
		const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

		return sortedPosts.map((post) => {
			const isLiked = likes.some((like) => like.docId === post.id);
			return <PostCard key={post.id} {...post} liked={isLiked}  currentRoute={currRoute}/>;
		});
	};

	return (
		<div className="relative">
			<Nav />
			<div className="py-8 px-4 bg-[#F3F3F4]">
				<div className="w-full pt-[10.2vh] flex flex-col gap-4 py-16 items-center">
					{isLikesFetched && renderPosts()}
					<div className="fixed right-5 bottom-7 flex flex-col gap-5">
						<button
							className="rounded-full hover:scale-105 hover:shadow-black/50 
                      transition-all duration-300 ease-in-out"
							onClick={() => setIsCreatePostOpen(true)}
						>
							{/* <Image src={addPostIcon} width={35} alt="Add Post" /> */}
							<h1 className='invisible'> icpepse</h1>
							<h2 className='invisible'>icpepse</h2>
							<h1><HiPlusCircle size={60} color="#1A2C1F" /></h1>
							
						</button>
					</div>
				</div>
				<CreatePostPopup
					isOpen={isCreatePostOpen}
					setIsCreatePostOpen={setIsCreatePostOpen}
					currentRoute={currRoute!}
				/>
			</div>
		</div>
	);
};

export default MostLikesPage;
