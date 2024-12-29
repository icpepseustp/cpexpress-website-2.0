import { LandingContent } from "@/content/landing/landing.content";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";
import { checkSession, setCookie } from "@/utils/auth";

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

  // Handle button click
  const handleProceed = async (): Promise<void> => {
    const uniqueID = generateUUID(); // Generate a unique ID
    const token = generateSessionToken(); // Generate a unique session token
    const name = await fetchRandomName(); // Fetch a random name
    
    // Store session data in cookies (1-day expiry for session cookies)
    handleSetCookie('userID', uniqueID, 1460);
    handleSetCookie('sessionToken', token, 1460);
    handleSetCookie('username', name, 1460);
    
    console.log(`Unique ID: ${uniqueID}`);
    console.log(`Session token initialized: ${token}`);
    console.log(`Assigned name: ${name}`);
    router.push('/home'); // Redirect to the desired page
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
          onClick={handleProceed}
        >
          PROCEED TO EXPRESS
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
