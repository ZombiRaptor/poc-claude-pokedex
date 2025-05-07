'use client';

import * as React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "./select";

interface PerPageSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options: number[];
  className?: string;
}

export function PerPageSelector({
  value,
  onChange,
  options,
  className,
}: PerPageSelectorProps) {
  const handleValueChange = (newValue: string) => {
    onChange(parseInt(newValue, 10));
  };

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Show</span>
        <Select value={value.toString()} onValueChange={handleValueChange}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={value.toString()} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">per page</span>
      </div>
    </div>
  );
}