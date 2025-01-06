import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface DOBSelectorProps {
  className?: string;
}

export default function DOBSelector({ className }: DOBSelectorProps) {
  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  const selectClassNames = {
    listboxWrapper: "bg-white dark:bg-black",
    base: "bg-white dark:bg-black",
    trigger: "bg-white dark:bg-black",
    listbox: "bg-white dark:bg-black",
    innerWrapper: "bg-white dark:bg-black",
    selectorIcon: "text-black dark:text-white",
  };

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      <Select
        label="Day"
        placeholder="Day"
        className="bg-white rounded-3xl text-black"
        classNames={selectClassNames}
      >
        {days.map((day) => (
          <SelectItem
            key={day.value}
            value={day.value}
            className="text-black dark:text-white"
          >
            {day.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Month"
        placeholder="Month"
        className="bg-white rounded-3xl text-black"
        classNames={selectClassNames}
      >
        {months.map((month) => (
          <SelectItem
            key={month.value}
            value={month.value}
            className="text-black dark:text-white"
          >
            {month.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Year"
        placeholder="Year"
        className="bg-white rounded-3xl text-black"
        classNames={selectClassNames}
      >
        {years.map((year) => (
          <SelectItem
            key={year.value}
            value={year.value}
            className="text-black dark:text-white"
          >
            {year.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
