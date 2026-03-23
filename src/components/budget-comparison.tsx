'use client';

import {useMemo} from 'react';
import {Progress} from '@/components/ui/progress';

type Expense = {
  amount: number;
  category: string;
  date: Date;
};

type BudgetComparisonProps = {
  expenses: Expense[];
  budgets: {[category: string]: number};
};

export function BudgetComparison({expenses, budgets}: BudgetComparisonProps) {
  const categoryComparisons = useMemo(() => {
    const categoryTotals: {[category: string]: number} = {};
    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return Object.entries(budgets).map(([category, budget]) => {
      const actualSpending = categoryTotals[category] || 0;
      const percentage = Math.min((actualSpending / budget) * 100, 100); // Cap at 100%
      const savings = budget - actualSpending;
      return {
        category,
        budget,
        actualSpending,
        percentage,
        savings,
      };
    });
  }, [expenses, budgets]);

  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-semibold">Budget Comparison</h3>
      {categoryComparisons.map((item) => (
        <div key={item.category} className="grid gap-2">
          <div className="flex justify-between">
            <span>{item.category}</span>
            <span>Budget: ${item.budget.toFixed(2)}</span>
          </div>
          <Progress value={item.percentage} />
          <div className="flex justify-between">
            <span>Spent: ${item.actualSpending.toFixed(2)}</span>
            {item.savings > 0 ? (
              <span className="text-positive">
                Saved: ${item.savings.toFixed(2)}
              </span>
            ) : (
              <span className="text-destructive">
                Overspent: ${Math.abs(item.savings).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
