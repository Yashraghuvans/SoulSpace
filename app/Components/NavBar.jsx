import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <>
      <header className=" backdrop-blur-sm py-2 fixed w-full z-[90] font-semibold text-xl">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden">
              <Image src="/favicon.ico" alt="Profile" width={70} height={70} />
            </div>
          </div>
          <nav className="flex space-x-7 gap-6">
            <Link href="#" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500">Home</a>
            </Link>
            <Link href="/beats" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500">Beats</a>
            </Link>

            <Link href="/copup" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500">Coping</a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500">Games</a>
            </Link>
            <Link href="/form" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500">Survey</a>
            </Link>
          </nav>
        </div>
        <div className='w-full border-1 border-white/90 my-2 '></div>
      </header>
    </>
  );
};

export default NavBar;