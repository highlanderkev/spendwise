'use client';

import {useState, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {CategorySelect} from '@/components/category-select';

type BudgetSettingsProps = {
  budgets: {[category: string]: number};
  setBudgets: (budgets: {[category: string]: number}) => void;
};

export function BudgetSettings({budgets, setBudgets}: BudgetSettingsProps) {
  const [category, setCategory] = useState<string>('Other');
  const [budgetAmount, setBudgetAmount] = useState<number | undefined>(undefined);

  const handleSetBudget = useCallback(() => {
    if (budgetAmount !== undefined) {
      setBudgets({...budgets, [category]: budgetAmount});
      setBudgetAmount(undefined);
    } else {
      alert('Please enter a valid budget amount.');
    }
  }, [category, budgetAmount, budgets, setBudgets]);

  const handleDeleteBudget = useCallback(
    (categoryToDelete: string) => {
      const newBudgets = {...budgets};
      delete newBudgets[categoryToDelete];
      setBudgets(newBudgets);
    },
    [budgets, setBudgets]
  );

  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-semibold">Set Budget</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <CategorySelect
            value={category}
            onValueChange={setCategory}
          />
        </div>
        <div>
          <Label htmlFor="budget">Budget Amount</Label>
          <Input
            type="number"
            id="budget"
            value={budgetAmount === undefined ? '' : budgetAmount.toString()}
            onChange={(e) => setBudgetAmount(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <Button onClick={handleSetBudget}>Set Budget</Button>

      <h3 className="text-xl font-semibold mt-4">Current Budgets</h3>
      {Object.entries(budgets).length > 0 ? (
        <ul className="grid gap-2">
          {Object.entries(budgets).map(([category, amount]) => (
            <li
              key={category}
              className="flex justify-between items-center rounded-md border p-4"
            >
              <span>
                {category}: ${amount.toFixed(2)}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteBudget(category)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No budgets set yet.</p>
      )}
    </div>
  );
}
