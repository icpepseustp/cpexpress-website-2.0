import PostCard from '@/components/home/postCard';
import Nav from '@/components/navigation/nav';
import CreatePostPopup from '@/components/home/createPostPopup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/utils/auth';
import { db } from '@/server/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { readSubCollection } from '@/server/firestoreservice';
import { HiPlusCircle } from 'react-icons/hi2';

const MostLikesPage = () => {
	const router = useRouter();
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
		const unsubscribe = onSnapshot(
			collection(db, 'posts'),
			async (snapshot) => {
				const fetchedPosts = snapshot.docs.map(
					(doc) =>
						({
							id: doc.id,
							...doc.data(),
						} as any)
				);
				fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
				setPosts(fetchedPosts);
			}
		);

		return () => unsubscribe();
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
			return <PostCard key={post.id} {...post} liked={isLiked} />;
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
							<HiPlusCircle size={60} color="#1A2C1F" />
						</button>
					</div>
				</div>
				<CreatePostPopup
					isOpen={isCreatePostOpen}
					setIsCreatePostOpen={setIsCreatePostOpen}
				/>
			</div>
		</div>
	);
};

export default MostLikesPage;
