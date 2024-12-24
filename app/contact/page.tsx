import ContactForm from "./contact-form";
import ContactInfo from "./contact-info";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-black dark:bg-white">
      <div className="container mx-auto px-4 py-8 bg-black text-white dark:bg-white dark:text-black w-full">
        <br></br>
        <br></br>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black text-white dark:bg-white dark:text-black">
          <div>
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
        <div className="mt-8 text-center bg-black text-white dark:bg-white dark:text-black">
          <br></br>
          <br></br>
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="/" className="text-muted-foreground ">
              <Facebook className="h-6 w-6 text-white dark:text-black" />
            </a>
            <a href="/" className="text-muted-foreground ">
              <Twitter className="h-6 w-6 text-white dark:text-black " />
            </a>
            <a href="/" className="text-muted-foreground ">
              <Instagram className="h-6 w-6 text-white dark:text-black" />
            </a>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
