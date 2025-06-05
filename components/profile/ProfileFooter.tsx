// components/Footer.tsx
import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-black text-white pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" /> */}
              <h3 className="ml-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Roster
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Roster helps creative professionals showcase their portfolios and
              connect with opportunities. We're redefining how talent presents
              their work to the world.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaGithub className="w-5 h-5" />, url: "#" },
                { icon: <FaLinkedin className="w-5 h-5" />, url: "#" },
                { icon: <FaTwitter className="w-5 h-5" />, url: "#" },
                { icon: <FaInstagram className="w-5 h-5" />, url: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="bg-gray-800 hover:bg-purple-600 rounded-full p-2 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-purple-500 pl-3">
              Resources
            </h4>
            <ul className="space-y-2">
              {["Documentation", "Tutorials", "Blog", "Help Center"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-purple-500 pl-3">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-300">Email:</span>
                <a
                  href="mailto:hello@roster.co"
                  className="ml-2 text-purple-400 hover:underline"
                >
                  hello@roster.co
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-300">Phone:</span>
                <Link
                  href="tel:+11234567890"
                  className="ml-2 text-purple-400 hover:underline"
                >
                  +1 (123) 456-7890
                </Link>
              </li>
              <li className="mt-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    Join our newsletter for creative insights
                  </p>
                  <div className="mt-2 flex w-full">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r transition-colors duration-300">
                      Join
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Roster, Inc. All rights reserved.
          </div>

          <div className="flex space-x-6">
            {["Terms", "Privacy", "Cookies", "Licenses"].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-8 text-center text-gray-500 text-sm flex items-center justify-center">
          Made with
          <motion.span
            className="mx-1 text-red-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaHeart />
          </motion.span>
          by creative talent everywhere
        </div>
      </div>
    </footer>
  );
};

export default ProfileFooter;
