import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Us Section */}
        <div>
          <h2 className="text-lg font-bold hover:text-blue-400 transition duration-300 cursor-pointer">
            About Us
          </h2>
          <p className="text-sm mt-2">
            We specialize in creating beautiful and functional interior spaces.
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              { icon: <FaFacebook />, href: "#" },
              { icon: <FaInstagram />, href: "https://www.instagram.com/ashokkumar0781?igsh=YzMwcnplc2o2Mm1u" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-xl hover:text-blue-400 transition duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-bold hover:text-blue-400 transition duration-300 cursor-pointer">
            Contact
          </h2>
          <p className="text-sm mt-2">Phone: +91 9845102493</p>
          <p className="text-sm">Email: karniinteriors9@gmail.com</p>
          <div className="mt-4">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "Contact", href: "/contact" },
              { name: "Gallery", href: "/gallery" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-sm hover:text-blue-400 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-2 gap-4">
          {["/images/image1.jpg", "/images/image2.jpg", "/images/image3.jpg", "/images/service3.png"].map((src, index) => (
            <Link key={index} href="/gallery">
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:brightness-75"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;