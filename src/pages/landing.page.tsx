import { LandingContent } from "@/content/landing/landing.content";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";
import { checkSession, setCookie } from "@/utils/auth";
import { createDocument } from "@/server/firestoreservice";
import { uploadFile } from "@/server/storageservice";

const LandingPage = () => {
  const router = useRouter();

  // Check for existing session on component mount
  useEffect(() => {
    if (checkSession()) {
      router.push('/home');
    }
  }, [router]);

  // Function to generate a UUID
  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };

  // Function to set a cookie with a specified expiration
  const handleSetCookie = (name: string, value: string, days: number): void => {
    setCookie(name, value, days);
  };

  // Function to generate a session token
  const generateSessionToken = () => {
    return 'session_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  // Function to fetch a random name
  const fetchRandomName = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const name = data.results[0].name;
    return `${name.first}`;
  };

  const fetchRandomImage = async (id: string) => {
    const image = await fetch('https://avatar.iran.liara.run/public');
    const imageBlob = await image.blob();
    const fileName = `avatar/${id}.jpg`;
    return await uploadFile(fileName, imageBlob);
  }

  // Handle button click
  const handleProceed = async (): Promise<void> => {
    try {
      const uniqueID = generateUUID(); 
      const token = generateSessionToken(); 
      const name = await fetchRandomName();  
      const image = await fetchRandomImage(uniqueID);
      
      handleSetCookie('sessionToken', token, 1460);
      handleSetCookie('uniqueID', uniqueID, 1460);
      handleSetCookie('username', name, 1460);

      createDocument('users', {
          uniqueID: uniqueID, 
          username: name, 
          photo: image, 
          createdAt: Date.now() 
      });

      router.push('/home'); 
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

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
      <div className="z-20 flex flex-col items-center justify-center gap-4 relative">
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
        <p className="text-brandLight text-md md:text-lg lg:text-xl font-medium italic opacity-80 text-center max-w-2xl mx-auto mb-6 md:mb-8 px-4 tracking-wide leading-relaxed transform transition-all duration-300 hover:scale-[1.02] hover:opacity-100">
          Connect, <span className="text-brandPrimary">Share</span>, Inspire: Your Digital Campus Community
        </p>
        <button
          className="text-brandDark text-md md:text-lg lg:text-xl font-bold italic bg-brandLight px-5 md:px-10 py-4 rounded-full"
          onClick={handleProceed}
        >
          PROCEED TO EXPRESS
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
