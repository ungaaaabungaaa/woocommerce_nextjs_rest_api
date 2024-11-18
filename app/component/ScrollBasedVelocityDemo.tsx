import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export function ScrollBasedVelocityDemo() {
  return (
    <VelocityScroll
      text="SUMMER SALE, WINTER SALE, 60% OFF DISCOUNTS LIMITED TIME ONLY!"
      default_velocity={2}
      className="font-display text-center  font-bold tracking-[-0.02em]  drop-shadow-sm text-white md:text-7xl md:leading-[5rem]"
    />
  );
}
