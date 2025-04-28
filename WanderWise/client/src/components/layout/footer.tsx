import { Link } from "wouter";
import {
  Facebook,
  Twitter,
  Instagram,
  Globe,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Globe className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold font-poppins text-white">
                TravelTour
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover amazing tours around the world with our curated travel
              experiences. We provide unforgettable adventures with local
              guides, comfortable accommodations, and hassle-free planning.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-400 hover:text-white transition"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-gray-400 hover:text-white transition"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Payment Options
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Travel Street, Tourism City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@traveltour.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TravelTour. All rights reserved.
            </p>
            <div className="flex items-center">
              <div className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="25"
                  className="h-6"
                >
                  <path
                    fill="#1565C0"
                    d="M45,35c0,2.2-1.8,4-4,4H7c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h34c2.2,0,4,1.8,4,4V35z"
                  />
                  <path
                    fill="#FFF"
                    d="M15.5,17.5c0.9-0.9,1.5-2.2,1.5-3.5c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5c0,1.4,0.6,2.6,1.5,3.5H15.5z"
                  />
                  <path
                    fill="#FFF"
                    d="M32.5,17.5c0.9-0.9,1.5-2.2,1.5-3.5c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5c0,1.4,0.6,2.6,1.5,3.5H32.5z"
                  />
                  <path
                    fill="#FFF"
                    d="M24,26.5c0.9-0.9,1.5-2.2,1.5-3.5c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5c0,1.4,0.6,2.6,1.5,3.5H24z"
                  />
                  <path
                    fill="#FFF"
                    d="M41,26.5c0.9-0.9,1.5-2.2,1.5-3.5c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5c0,1.4,0.6,2.6,1.5,3.5H41z"
                  />
                  <path
                    fill="#FFF"
                    d="M32.5,35.5c0.9-0.9,1.5-2.2,1.5-3.5c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5c0,1.4,0.6,2.6,1.5,3.5H32.5z"
                  />
                  <path
                    fill="#FFF"
                    d="M15.5,35.5c0.9-0.9,1.5-2.2,1.5-3.5c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5c0,1.4,0.6,2.6,1.5,3.5H15.5z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="25"
                  className="h-6"
                >
                  <path
                    fill="#FF9800"
                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                  />
                  <path
                    fill="#D50000"
                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="25"
                  className="h-6"
                >
                  <path
                    fill="#1565C0"
                    d="M45,35c0,2.2-1.8,4-4,4H7c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h34c2.2,0,4,1.8,4,4V35z"
                  />
                  <path
                    fill="#FFF"
                    d="M22.255 20l-2.113 4.683L18.039 20h-2.695v6.726L12.341 20h-2.274L7 26.981h1.815l.701-1.594h3.76l.701 1.594h3.481v-5.387l2.345 5.387h1.642l2.345-5.337v5.337H25.6v-6.981H22.255zM10.699 23.775l1.18-2.681 1.18 2.681H10.699zM30.235 26.981h1.734v-5.414h2.396v-1.567h-6.526v1.567h2.396V26.981zM38.074 25.414c-.998 0-1.609-.786-1.609-1.716 0-.931.611-1.717 1.609-1.717.803 0 1.301.376 1.407.412l.545-1.231c-.258-.141-1.02-.461-2.051-.461-1.935 0-3.256 1.325-3.256 3.071s1.32 2.997 3.244 2.997c1.068 0 1.803-.412 1.803-.412l-.47-1.299C39.297 25.053 38.847 25.414 38.074 25.414z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="25"
                  className="h-6"
                >
                  <rect
                    width="36"
                    height="25"
                    x="6"
                    y="12"
                    fill="#2196F3"
                    rx="2"
                  />
                  <path
                    fill="#FFF"
                    d="M24.5,24.7c0,0,2.4-0.6,2.4-2.8c0-0.2,0-0.7-0.4-0.7c-0.2,0-0.3,0.1-0.3,0.4c0,0.8-0.3,2.2-1.6,2.2 C24.5,23.8,24.5,24.7,24.5,24.7z M24.5,25.8c0,0,3.3-0.5,3.3-3.7c0-0.2,0-0.7-0.4-0.7c-0.2,0-0.3,0.1-0.3,0.4c0,1.8-1.1,3-2.6,3 C24.5,24.8,24.5,25.8,24.5,25.8z M19,24.3c0.6,0,1.1-0.3,1.4-0.9h1.3v4.2c0,1.3-1,2.4-2.3,2.4h-1.8c-1.3,0-2.3-1.1-2.3-2.4v-6.7 c0-1.3,1-2.4,2.3-2.4H19c1.3,0,2.3,1.1,2.3,2.4v0.9h-1.3c-0.2-0.6-0.8-0.9-1.4-0.9h-0.6c-0.6,0-1.1,0.5-1.1,1.1v5.5 c0,0.6,0.5,1.1,1.1,1.1H19z M34.9,24.3c0.6,0,1.1-0.3,1.4-0.9h1.3v4.2c0,1.3-1,2.4-2.3,2.4h-1.8c-1.3,0-2.3-1.1-2.3-2.4v-6.7 c0-1.3,1-2.4,2.3-2.4h1.3c1.3,0,2.3,1.1,2.3,2.4v0.9h-1.3c-0.2-0.6-0.8-0.9-1.4-0.9h-0.6c-0.6,0-1.1,0.5-1.1,1.1v5.5 c0,0.6,0.5,1.1,1.1,1.1H34.9z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
