"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos && visible) {
        controls.start({ y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } });
        setVisible(false);
      } else if (currentScrollPos < prevScrollPos && !visible) {
        controls.start({ y: 0, transition: { duration: 0.3, ease: "easeInOut" } });
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible, controls]);

  return (
    <motion.header
      className="backdrop-blur-sm py-2 fixed w-full z-[90] font-semibold text-xl"
      style={{ top: 0 }}
      animate={controls}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden">
            <Image src="/favicon.ico" alt="Profile" width={70} height={70} />
          </div>
        </div>
        <nav className="flex space-x-7 gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-white/90 hover:text-blue-500">Home</a>
          </Link>
          <Link href="/beats" legacyBehavior>
            <a className="text-white/90 hover:text-blue-500">Beats</a>
          </Link>
          <Link href="/copup" legacyBehavior>
            <a className="text-white/90 hover:text-blue-500">Support Tool</a>
          </Link>
          <Link href="/emotionWheel" legacyBehavior>
            <a className="text-white/90 hover:text-blue-500">Journal</a>
          </Link>
          <Link href="/form" legacyBehavior>
            <a className="text-white/90 hover:text-blue-500">Survey</a>
          </Link>
        </nav>
      </div>
      <div className='w-full border-1 border-white/90 my-2 '></div>
    </motion.header>
  );
};

export default NavBar;