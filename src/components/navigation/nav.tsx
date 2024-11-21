import { navContent } from "@/content/navigation/nav.content"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBar = () => {
  const { icpepLogo } = navContent
  const pathname = usePathname()

  return (
    <nav className="w-screen bg-brandDark flex justify-between fixed h-[10%] items-center border-b-black border-b-2 px-5 py-1">
      <div className="flex items-center">
        <Image
          src={icpepLogo}
          width={60}
          alt="ICpEP Logo"
          className="mr-4"
        />
        <h1 className="font-bold text-brandLight text-2xl">CpExpress</h1>
      </div>

      <div className="flex gap-10 items-center">
        <div className="flex gap-5">
          <Link href="/home">
            <h1
              className={`text-brandLight font-bold ${
                pathname === "/home" && "border-b-[3px] border-brandLight" 
              }`}
            >
              Home
            </h1>
          </Link>

          <Link href="/mostlikes">
            <h1
              className={`text-brandLight font-bold ${
                pathname === "/mostlikes" && "border-b-[3px] border-brandLight"
              }`}
            >
              Most Likes
            </h1>
          </Link>
        </div>
        <div className="rounded-full w-11 h-11 mr-5 bg-brandLight overflow-hidden">
          <Image
            src="https://avatar.iran.liara.run/public"
            width={50}
            height={50}
            alt="avatar-profile"
          />
        </div>
      </div>
    </nav>
  )
}

export default NavBar