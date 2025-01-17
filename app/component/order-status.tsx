"use client";

import { FileText, Package, Truck, Check, ArrowRight } from "lucide-react";

interface OrderStatusProps {
  status?: string;
}

export function OrderStatus({ status = "Processing Order" }: OrderStatusProps) {
  const steps = [
    { label: "Processing Order", apiKey: "processing-order", icon: FileText },
    { label: "Order Dispatched", apiKey: "order-dispatched", icon: Package },
    { label: "In Transit", apiKey: "in-transit", icon: Truck },
    { label: "Delivered", apiKey: "delivered", icon: Check },
  ];

  // Find the current step using the `apiKey`, defaulting to 0 if no match is found
  const currentStep = steps.findIndex(
    (step) => step.apiKey.toLowerCase() === status.toLowerCase()
  );

  // Default to the first step ("Processing Order") if no valid step is found
  const activeStep = currentStep >= 0 ? currentStep : 0;

  return (
    <div className="w-full max-w-6xl mx-auto flex justify-center">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0 relative w-full"
            >
              <div className="flex flex-col items-center w-full sm:w-auto">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${
                      isActive
                        ? "bg-black text-white ring-4 ring-green-500"
                        : "bg-black text-white ring-4 ring-gray-400"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm mt-2 text-center">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+3rem)] top-6 -translate-y-1/2 hidden sm:block">
                  <ArrowRight className="w-10 h-10 text-white dark:text-black" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="sm:hidden my-4">
                  <ArrowRight className="w-10 h-10 text-white dark:text-black transform rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
