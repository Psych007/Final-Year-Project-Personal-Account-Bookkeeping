"use client";
import React, { useEffect, useState } from 'react';
import { Budgets, Expenses } from '../../../../utils/schema'; // Ensure Expenses is imported
import { db } from '../../../../utils/dbConfig';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import { Toaster, toast } from 'sonner'; // Adjusted import for consistency

const deleteExpense = async (expense, refreshData, setLoading) => {
  setLoading(true);
  try {
    const result = await db.delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast('Expense Deleted');
      refreshData();
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
    toast.error('Failed to delete expense');
  }
  setLoading(false);
};

function Expense() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    setLoading(true);
    try {
      const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt
      }).from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));
      
      setExpensesList(result);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (expense) => {
    await deleteExpense(expense, getAllExpenses, setDeleting);
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-4xl font-extrabold mb-4">My Expenses</h1>
      <h2 className="text-l font-semibold mb-4">Latest Expenses</h2>
      {loading || deleting ? (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((item, index) => (
            <div key={index} className='h-[130px] w-full bg-slate-200 animate-pulse rounded-lg' />
          ))}
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {expensesList.map(expense => (
              <tr key={expense.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{expense.name}</td>
                <td className="px-4 py-2">{expense.amount}</td>
                <td className="px-4 py-2">{new Date(expense.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(expense)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Expense;
