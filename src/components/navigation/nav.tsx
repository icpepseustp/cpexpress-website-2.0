import { navContent } from "@/content/navigation/nav.content"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NavBar = () => {
  const { icpepLogo, hamburgerMenu } = navContent
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-screen bg-brandDark flex justify-between fixed h-[10%] items-center   px-5 py-1">
      <div className="flex items-center">
        <Image
          src={icpepLogo}
          width={60}
          alt="ICpEP Logo"
          className="mr-4"
        />  
        <h1 className="font-bold text-brandLight text-xl lg:text-2xl">CpExpress</h1>
      </div>

      {/* Menu for large screens */}
      <div className="hidden md:flex gap-10 items-center">
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

      {/* Hamburger Menu Button for Small Screens */}
			<div className="flex md:hidden">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="text-brandLight focus:outline-none"
				>
					{/* Icon for Hamburger */}
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</div>

      {/* Mobile Menu */}
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} absolute top-[88%] left-0 w-[70%] h-screen mt-2 md:hidden bg-brandDark`}
			>
				<div className="flex flex-col items-start  py-4">
          <div className="rounded-full w-11 h-11 ml-6 mb-6 bg-brandLight overflow-hidden">
            <Image
              src="https://avatar.iran.liara.run/public"
              width={50}
              height={50}
              alt="avatar-profile"
            />
          </div>
					{navContent.navItems.map((item, index) => (
						<div className="py-2 px-6" key={index}>
							<Link
								href={item.href}
								className="text-2xl text-brandLight font-bold drop-shadow-xl"
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
							{pathname === item.href ? (
								<div className="w-full h-1 bg-brandLight"></div>
							) : null}
						</div>
					))}
				</div>
			</div>
    </nav>
  )
}

export default NavBar