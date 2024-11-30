"use client"

import { useState, useRef } from 'react';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent! We'll get back to you as soon as possible.", {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
    });

    setIsSubmitting(false);

    // Reset form using ref
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <Input type="text" placeholder="Your Name" required />
      <Input type="email" placeholder="Your Email" required />
      <Textarea placeholder="Your Message" rows={12} required />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
