"use client";

import { useState, useRef } from 'react';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(formRef.current!);
    const name = formData.get("name");
    const email = formData.get("email");
    const reason = formData.get("message");

    try {
      // Send data to WordPress REST API
      // do like this 
      //  
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/contact-form/v1/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent! We'll get back to you as soon as possible.", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });

        // Reset form using ref
        formRef.current?.reset();
      } else {
        toast.error(data.message || "Failed to send message. Please try again later.", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <Input name="name" type="text" placeholder="Your Name" required />
      <Input name="email" type="email" placeholder="Your Email" required />
      <Textarea name="message" placeholder="Your Message" rows={12} required />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
