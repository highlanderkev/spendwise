'use client';

import {useState, useEffect} from 'react';

import {getSpendingTips} from '@/ai/flows/spending-tips';
import {Skeleton} from '@/components/ui/skeleton';

type Expense = {
  amount: number;
  category: string;
  date: Date;
};

type SpendingTipsProps = {
  expenses: Expense[];
  budgets: {[category: string]: number};
};

export function SpendingTips({expenses, budgets}: SpendingTipsProps) {
  const [tips, setTips] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSpendingTips = async () => {
      setIsLoading(true);
      try {
        // Summarize expenses
        const expenseSummary = summarizeExpenses(expenses);

        // Stringify budget settings
        const budgetSettings = JSON.stringify(budgets);

        // Compare spending against the budget
        const spendingComparison = compareSpendingToBudget(expenses, budgets);

        const aiTips = await getSpendingTips({
          expenseSummary: expenseSummary,
          budgetSettings: budgetSettings,
          spendingComparison: spendingComparison,
        });
        setTips(aiTips?.tips || 'No tips available.');
      } catch (error) {
        console.error('Failed to fetch spending tips:', error);
        setTips('Failed to fetch spending tips. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpendingTips();
  }, [expenses, budgets]);

  const summarizeExpenses = (expenses: Expense[]): string => {
    const categoryTotals: {[category: string]: number} = {};
    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return Object.entries(categoryTotals)
      .map(([category, total]) => `${category}: $${total.toFixed(2)}`)
      .join('; ');
  };

  const compareSpendingToBudget = (
    expenses: Expense[],
    budgets: {[category: string]: number}
  ): string => {
    const categoryTotals: {[category: string]: number} = {};
    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return Object.entries(budgets)
      .map(([category, budget]) => {
        const actualSpending = categoryTotals[category] || 0;
        const difference = budget - actualSpending;
        return `${category}: Budget $${budget.toFixed(
          2
        )}, Spent $${actualSpending.toFixed(2)}, Difference $${difference.toFixed(2)}`;
      })
      .join('; ');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Personalized Spending Tips</h3>
      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <p className="mt-2">{tips}</p>
      )}
    </div>
  );
}
