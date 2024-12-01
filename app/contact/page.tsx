import ContactForm from './contact-form'
import ContactInfo from './contact-info'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <br></br>
      <br></br>
      <br></br>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactInfo />
        </div>
      </div>
      <div className="mt-8 text-center">
        <br></br>
        <br></br>
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-4">
          <a href="/" className="text-muted-foreground ">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="/" className="text-muted-foreground ">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="/" className="text-muted-foreground ">
            <Instagram className="h-6 w-6" />
          </a>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}
