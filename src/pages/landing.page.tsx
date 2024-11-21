import { LandingContent } from "@/content/landing/landing.content";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-cover overflow-hidden relative flex justify-center items-center">
      {/* Background */}
      <Image src={LandingContent.backgroundOldEffect} alt="background" layout="fill" objectFit="cover" />

      {/* Upper left vine */}
      <Image
        className="w-[60%] absolute top-0 left-0"
        src={LandingContent.vineLeft}
        alt="vine-left"
        width={200}
      />

      {/* Lower right vine */}
      <Image
        className="w-[60%] absolute right-0 bottom-0"
        src={LandingContent.vineRight}
        alt="vine-left"
      />

      <div className="bg-black opacity-40 w-full h-full absolute top-0 z-10"></div>

      <Image
        className="w-full h-full absolute top-0"
        src={LandingContent.brownGradient}
        alt="brown gradient"
      />

      {/* Centered content */}
      <div className="z-20 flex flex-col items-center justify-center gap-16 relative">
        <div className="flex justify-center items-center mr-[4%]">
          <Image className="w-[22%]" src={LandingContent.kuagohLogo} alt="kuagoh-logo" />
          <div className="mt-4">
            <h1 className="text-brandLight text-4xl md:text-7xl lg:text-9xl font-bold italic">
              ICPEP.SE
            </h1>
            <h1 className="text-brandDark text-3xl md:text-6xl lg:text-8xl font-bold italic">
              CPEXPRESS
            </h1>
          </div>
        </div>
        <button
          className="text-brandDark text-xs md:text-lg lg:text-xl font-bold italic bg-brandLight px-5 md:px-10 py-4 rounded-full"
          onClick={() => router.push("/home")}
        >
          PROCEED TO EXPRESS
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
