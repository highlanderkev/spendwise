'use client';

import {useState} from 'react';

import {ExpenseInput} from '@/components/expense-input';
import {ExpenseSummary} from '@/components/expense-summary';
import {BudgetComparison} from '@/components/budget-comparison';
import {SpendingTips} from '@/components/spending-tips';
import {BudgetSettings} from '@/components/budget-settings';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export default function Home() {
  const [expenses, setExpenses] = useState<
      {amount: number; category: string; date: Date}[]
  >([]);
  const [budgets, setBudgets] = useState<{[category: string]: number}>({});

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">SpendWise</h1>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="justify-center">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="ai">AI Tips</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseInput
                onAddExpense={(newExpense) =>
                  setExpenses([...expenses, newExpense])
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseSummary expenses={expenses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="budget" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Set Your Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetSettings budgets={budgets} setBudgets={setBudgets} />
              <BudgetComparison expenses={expenses} budgets={budgets} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Spending Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingTips expenses={expenses} budgets={budgets} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
