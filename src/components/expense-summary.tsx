'use client';

import {useState, useMemo} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {CalendarIcon} from 'lucide-react';
import {format, subMonths, addMonths, startOfMonth, endOfMonth} from 'date-fns';
import {cn} from '@/lib/utils';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Expense = {
  amount: number;
  category: string;
  date: Date;
};

type ExpenseSummaryProps = {
  expenses: Expense[];
};

export function ExpenseSummary({expenses}: ExpenseSummaryProps) {
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const summaryData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) {
      return [];
    }

    const filteredExpenses = expenses.filter((expense) => {
      return (
        expense.date >= dateRange.from! && expense.date <= dateRange.to!
      );
    });

    const categoryTotals: {[category: string]: number} = {};
    filteredExpenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
    }));
  }, [expenses, dateRange]);

  const handlePreviousMonth = () => {
    if (!dateRange.from || !dateRange.to) {
      return;
    }
    const newFrom = subMonths(dateRange.from, 1);
    const newTo = subMonths(dateRange.to, 1);
    setDateRange({
      from: startOfMonth(newFrom),
      to: endOfMonth(newTo),
    });
  };

  const handleNextMonth = () => {
    if (!dateRange.from || !dateRange.to) {
      return;
    }
    const newFrom = addMonths(dateRange.from, 1);
    const newTo = addMonths(dateRange.to, 1);

    if (newFrom > new Date()) {
      return;
    }

    setDateRange({
      from: startOfMonth(newFrom),
      to: endOfMonth(newTo),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            Next
          </Button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                (!dateRange.from || !dateRange.to) && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from && dateRange.to ? (
                format(dateRange.from, 'MMMM yyyy')
              ) : (
                <span>Pick a month</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({
                    from: startOfMonth(range.from),
                    to: endOfMonth(range.to),
                  });
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {summaryData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No expenses recorded for the selected period.</p>
      )}
    </div>
  );
}
