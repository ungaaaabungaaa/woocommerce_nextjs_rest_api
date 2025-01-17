"use client";

import { FileText, Package, Truck, Check } from "lucide-react";

interface OrderStatusProps {
  status?: string;
}

export function OrderStatus({ status = "Processing Order" }: OrderStatusProps) {
  const steps = [
    { label: "Processing Order", icon: FileText },
    { label: "Order Dispatched", icon: Package },
    { label: "In Transit", icon: Truck },
    { label: "Delivered", icon: Check },
  ];

  const currentStep = steps.findIndex((step) =>
    step.label.toLowerCase().includes(status.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto ">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0 w-full sm:w-auto"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${
                      isActive
                        ? "bg-black text-white ring-4 ring-green-500"
                        : "bg-black text-white"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm mt-2 text-center">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 my-2 sm:my-0 text-gray-400 flex items-center justify-center">
                  <span className="transform rotate-90 sm:rotate-0">→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
