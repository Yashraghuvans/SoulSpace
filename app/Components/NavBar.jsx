import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <header className="bg-transparent backdrop-blur-xl py-2 px-6 fixed w-full z-[90]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden">
            <Image src="/favicon.ico" alt="Profile" width={70} height={70} />
          </div>
        </div>
        <nav className="flex space-x-7 gap-6">
          <Link href="#" legacyBehavior>
            <a className="text-black">Home</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="text-black">About Us</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="text-black">Services</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="text-black">Games</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a className="text-black">Survey</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;