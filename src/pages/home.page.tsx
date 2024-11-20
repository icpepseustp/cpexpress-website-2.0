import PostCard from "@/components/home/postCard"
import Nav from "@/components/navigation/nav"
import { homeContent } from "@/content/home/home.content"
import Image from "next/image"


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

                <div className=" fixed right-5 bottom-7  flex flex-col gap-5">
                    <div className="border-2 rounded-full border-black p-3">
                        <Image src={homeContent.likeIcon} width={35} alt="Like Icon" />
                    </div>
                    <div className="border-2 rounded-full border-black p-3">
                        <Image src={homeContent.addPostIcon} width={35} alt="Like Icon" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage