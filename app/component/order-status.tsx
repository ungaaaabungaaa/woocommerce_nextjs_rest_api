import { Check, Package, Truck } from "lucide-react";

interface OrderStatusProps {
  status: string;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const steps = [
    { label: "Processing Order", icon: Package },
    { label: "Order Dispatched", icon: Package },
    { label: "In Transit", icon: Truck },
    { label: "Delivered", icon: Check },
  ];

  const currentStep =
    steps.findIndex((step) =>
      step.label.toLowerCase().includes(status.toLowerCase())
    ) + 1;

  return (
    <div className="w-full py-4">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index < currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2">{step.label}</span>
            </div>
          );
        })}
        <div className="absolute top-5 left-0 h-[2px] w-full bg-muted -z-0">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
