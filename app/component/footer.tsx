'use client'
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock, Star} from 'lucide-react';
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo";
import { ScrollBasedVelocityDemo } from "./ScrollBasedVelocityDemo";




export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      setIsSubscribed(true);
      setEmail('Subscribed successfully!');
    } else {
      console.log("Subscription failed.", e)
    }
  };

  

  return (
    <footer className="bg-black text-white">

      <ScrollBasedVelocityDemo></ScrollBasedVelocityDemo>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

       <AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Image src="/sitelogo.jpeg" alt="Company Logo" width={200} height={60} className="" />
            <p>We provide high-quality products and excellent customer service. Our mission is to deliver the best shopping experience to our valued customers.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold">Quick Links</h2>
            <div className="grid grid-cols-2 gap-2">
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 E-commerce St, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@example.com</span>
              </li>
            </ul>
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Customer Service Hours</h3>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Mon-Fri: 9AM - 6PM</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Sat: 10AM - 4PM</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Sun: Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold">Stay Connected</h2>
            <p>Subscribe to our newsletter for updates and exclusive offers.</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                isClearable
                isRequired
                type="email"
                value={email}
                onChange={(e) => {
                  if (!isSubscribed) setEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className="bg-black text-white border-gray-700 focus:border-gray-600"
                disabled={isSubscribed}
              />
              <Button 
                type="submit"
                className={`w-full ${
                  isSubscribed ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-white hover:bg-black text-black hover:text-white'
                }`}
                disabled={isSubscribed}
                >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Payment Methods and Trust Badges */}
        <div className="mb-12">
          <h2 className="text-white text-xl font-semibold mb-4">Secure Payment Methods</h2>
          <span className="logos--paypal"></span>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Studio Universal. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-sm hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}