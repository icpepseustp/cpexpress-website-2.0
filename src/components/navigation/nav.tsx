import { navContent } from "@/content/navigation/nav.content"
import Image from "next/image"

const NavBar = () => {

    return (
        <nav className="w-screen bg-brandDark flex justify-between fixed h-[10%] items-center border-b-black border-b-2 px-5 py-1">
            <div className="flex items-center">
                <Image
                    src={navContent.icpepLogo}
                    width={60}
                    alt="ICpEP Logo"
                    className="mr-4"
                />
                <h1 className="font-bold text-brandLight text-2xl">CpExpress</h1>
            </div>
            <div className="rounded-full w-11 h-11 bg-brandLight">
                <Image src='https://avatar.iran.liara.run/public' width={50} height={50} alt="avatar-profile"/>
            </div>
        </nav>
    )
}


export default NavBar