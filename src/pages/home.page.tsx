import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import { homeContent } from "@/content/home/home.content"

const HomePage = () => {

    const renderPosts = () => {
        return homeContent.postDetails.map( (post, index) => (
            <PostCard key={index} {...post} />
        ));
    };
    
    return (
        <>
            <Nav/>
            <div className=" w-full  pt-[10.2vh] flex flex-col gap-12 py-16 items-center">
                {renderPosts()}
            </div>
        </>
    )
}

export default HomePage