import { Mail, Phone, MapPin } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function ContactInfo() {
  return (
    <>
    <div className="space-y-4 mb-8 bg-black dark:bg-white text-white dark:text-black">
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <div className="flex items-center space-x-2">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <span>support@yourecommerce.com</span>
      </div>
      <div className="flex items-center space-x-2">
        <Phone className="h-5 w-5 text-muted-foreground" />
        <span>+1 (555) 123-4567</span>
      </div>
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <span>123 E-commerce St, Online City, 12345</span>
      </div>
    </div>
    </>
    
  )
}
