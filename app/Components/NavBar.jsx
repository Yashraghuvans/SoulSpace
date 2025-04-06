"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      <motion.header
        className="backdrop-blur-sm py-2 fixed w-full z-[90] font-semibold text-xl"
        style={{ top: 0 }}
        animate={controls}
      >
        <div className="container mx-auto flex justify-between items-center px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
              <Image src="/favicon.ico" alt="Profile" width={80} height={80} className="object-cover" />
            </div>
          </div>
          <button
            className="sm:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <nav className="hidden sm:flex space-x-4 sm:space-x-6 md:space-x-7 lg:space-x-7 gap-2 sm:gap-4 md:gap-6">
            <Link href="/" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500 text-sm sm:text-base md:text-lg">Home</a>
            </Link>
            <Link href="/beats" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500 text-sm sm:text-base md:text-lg">Beats</a>
            </Link>
            <Link href="/copup" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500 text-sm sm:text-base md:text-lg">Support Tool</a>
            </Link>
            <Link href="/emotionWheel" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500 text-sm sm:text-base md:text-lg">Journal</a>
            </Link>
            <Link href="/form" legacyBehavior>
              <a className="text-white/90 hover:text-blue-500 text-sm sm:text-base md:text-lg">Survey</a>
            </Link>
          </nav>
        </div>
        <div className="w-full border-1 border-white/90 my-2"></div>
      </motion.header>
      <motion.div
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 z-[100] flex flex-col items-start p-6 space-y-4 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="text-white text-2xl self-end focus:outline-none"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>
        <Link href="/" legacyBehavior>
          <a
            className="text-white/90 hover:text-blue-500 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
        </Link>
        <Link href="/beats" legacyBehavior>
          <a
            className="text-white/90 hover:text-blue-500 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Beats
          </a>
        </Link>
        <Link href="/copup" legacyBehavior>
          <a
            className="text-white/90 hover:text-blue-500 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Support Tool
          </a>
        </Link>
        <Link href="/emotionWheel" legacyBehavior>
          <a
            className="text-white/90 hover:text-blue-500 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Journal
          </a>
        </Link>
        <Link href="/form" legacyBehavior>
          <a
            className="text-white/90 hover:text-blue-500 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Survey
          </a>
        </Link>
      </motion.div>
    </>
  );
};

export default NavBar;