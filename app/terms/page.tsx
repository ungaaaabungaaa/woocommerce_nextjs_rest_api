// pages/terms-and-conditions.js

import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import React from 'react';
import { cn } from "@/lib/utils";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <br></br>  
        <br></br> 
        <br></br> 
        <h1 className='text-4xl font-bold'>Terms and Conditions</h1>
        <br></br>  
        <br></br> 
        <br></br> 
        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Introduction</h2>
          <p>
            Welcome to our Terms and Conditions page. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <p>
            Please read these terms carefully before using our services. If you do not agree with any part of these terms, you must not use our website.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Use of the Website</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of, or restrict or inhibit the use of this website by any third party.
          </p>
          <p>
            You are responsible for ensuring that all information you provide through our website is accurate and up-to-date.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Account Registration</h2>
          <p>
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and password. 
            You agree to accept responsibility for all activities that occur under your account.
          </p>
          <p>
            You must notify us immediately if you become aware of any unauthorized use of your account.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Product and Service Availability</h2>
          <p>
            We make every effort to ensure that the products and services offered on our website are available as described. However, we do not guarantee the availability of all items at all times.
          </p>
          <p>
            We reserve the right to withdraw or modify any product or service offered on the website without prior notice.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Pricing and Payments</h2>
          <p>
            All prices displayed on our website are in [Currency] and are subject to change without notice. 
            The final price of your order will be confirmed at the checkout page before you make a payment.
          </p>
          <p>
            Payment must be made in full before the processing and shipment of any orders.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Intellectual Property</h2>
          <p>
            All content on our website, including but not limited to text, images, graphics, logos, and software, is the property of [Your Company Name] or its licensors and is protected by copyright and intellectual property laws.
          </p>
          <p>
            You may not copy, modify, or distribute any content from the website without obtaining prior written consent from us.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Limitation of Liability</h2>
          <p>
            We will not be held liable for any indirect, special, incidental, or consequential damages arising from the use of our website or services.
          </p>
          <p>
            We are not responsible for any loss of data, business interruption, or other damages resulting from your use of our website.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless [Your Company Name], its affiliates, employees, and partners from any claims, losses, or damages arising out of your violation of these terms.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or actions of these third-party sites.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our website at our discretion, without notice, for violation of these terms or any applicable law.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Governing Law</h2>
          <p>
            These terms and conditions are governed by the laws of [Your Country/State]. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in [Your Location].
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Changes to Terms and Conditions</h2>
          <p>
            We may update these terms from time to time. Any changes will be posted on this page, and the date of the last update will be indicated at the bottom of the page.
          </p>
        </section>

        <section>
          <br></br> 
          <h2 className='text-2xl font-bold'>Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms and Conditions, please contact us at [your contact email].
          </p>
        </section>
        <br></br>  
      </div>


      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />


    </div>
  );
};

export default TermsAndConditions;
