import { navContent } from "@/content/navigation/nav.content"
import Image from "next/image"

const Nav = () => {
    return (
        <div className="w-screen bg-brandDark flex h-[10%] items-center border-b-black border-b-2 px-5 py-1">
            <Image src={navContent.icpepLogo} width={60} alt={"icpep-logo"}/>
            <h1 className="font-bold text-brandLight text-2xl ml-4 ">CpExpress</h1>
        </div>
    )
}

export default Nav  