// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left p-6">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">Welcome to TaskFlow</h1>
          <p className="text-lg mb-4">
            Unlock your productivity with TaskFlow—the all-in-one task management solution tailored for professionals like you.
          </p>
          <p className="text-lg mb-6">
            Join us today to simplify your task management and take your projects to new heights.
          </p>
          <p className=" text-xl mb-6 font-bold">It’s time to work smarter, not harder! </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center md:justify-start">
            <Link href="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Get Started
            </Link>
            <Link href="/login" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Log In  
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img src="/images/home.jpeg" alt="TaskFlow Graphics" className="w-80 h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}
