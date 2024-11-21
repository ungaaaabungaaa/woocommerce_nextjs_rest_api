"use client"

import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { ArrowLeftCircle, HelpCircle, RefreshCcw, ShieldCheck } from 'lucide-react'

export default function RefundPage() {
  const [orderId, setOrderId] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Random success or failure for demonstration
      if (Math.random() > 0.5) {
        setStatus('success')
        setMessage('Your refund request has been submitted successfully. We will process it within 3-5 business days.')
      } else {
        setStatus('error')
        setMessage('There was an error processing your refund request. Please ensure your order ID is correct and try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <>
   <br></br>
   <br></br>
   
   <div className="min-h-screen bg-black text-white">
    

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-black text-white max-w-2xl mx-auto">
          <CardHeader className="flex flex-col items-center space-y-4">
            <RefreshCcw size={48} className="text-white" />
            <h1 className="text-3xl font-bold">Request a Refund</h1>
            <p className="text-center text-white">
              We're sorry you're not satisfied with your purchase. Please fill out the form below to request a refund.
            </p>
          </CardHeader>

          <Divider className="my-4" />

          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="order-id" className="block text-sm font-medium text-white">
                  Order ID
                </label>
                <Input
                  id="order-id"
                  name="orderId"
                  type="text"
                  isClearable
                  size="lg"
                  isRequired
                  className="mt-1 w-full bg-black text-white"
                  placeholder="Enter your Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-white">
                  Reason for Refund
                </label>
                <Textarea
                  id="reason"
                  name="reason"
                  className="mt-1 w-full bg-black text-white"
                  placeholder="Please provide a detailed reason for your refund request"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white  text-black py-2 px-4 rounded"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Processing...' : 'Submit Refund Request'}
              </Button>
            </form>

            {message && (
              <div className={`mt-4 p-4 rounded ${status === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
                {message}
              </div>
            )}
          </CardBody>

      

          <CardFooter>
            <div className="w-full space-y-4">
              <div className="flex items-center">
                <ShieldCheck className="text-white mr-2" />
                <p className="text-sm text-gray-300">Your refund request is secure and will be processed promptly.</p>
              </div>
              <div className="flex items-center">
                <HelpCircle className="text-white mr-2" />
                <p className="text-sm text-gray-300">
                  Need help? Contact our support team at{' '}
                  <a href="mailto:support@example.com" >
                    support@example.com
                  </a>
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
    <br></br>
    <br></br>
    </>
  )
}