'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {CategorySelect} from '@/components/category-select';

type Expense = {
  amount: number;
  category: string;
  date: Date;
};

type ExpenseInputProps = {
  onAddExpense: (expense: Expense) => void;
};

export function ExpenseInput({onAddExpense}: ExpenseInputProps) {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>('Other');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (amount && date) {
      const newExpense: Expense = {
        amount: amount,
        category: category,
        date: date,
      };
      onAddExpense(newExpense);
      setAmount(undefined);
      setDate(new Date()); // Reset to the current date
    } else {
      alert('Please enter both amount and date.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            value={amount === undefined ? '' : amount.toString()}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <CategorySelect
            value={category}
            onValueChange={setCategory}
          />
        </div>
      </div>
      <div>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date > new Date() || date < new Date('2020-01-01')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit">Add Expense</Button>
    </form>
  );
}
