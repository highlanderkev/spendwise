'use client';

import * as React from 'react';

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

type CategorySelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Rent',
  'Shopping',
  'Other',
];

export function CategorySelect({value, onValueChange}: CategorySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
