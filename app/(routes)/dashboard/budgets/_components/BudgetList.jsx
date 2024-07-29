"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import { db } from 'C:/Users/PMLS/OneDrive/Desktop/Inshallah/expense-tracker/utils/dbConfig.jsx'; 
import { Budgets, Expenses } from '../../../../../utils/schema';
import { desc, getTableColumns , sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import Cardinfo from 'C:/Users/PMLS/OneDrive/Desktop/Inshallah/expense-tracker/app/(routes)/dashboard/_components/Cardinfo.jsx';


function BudgetList() {
    const [budgetList, setBudgetList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getBudgetList();
    }, [user]);

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql `sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

        setBudgetList(result);
    };

    return (
        <div className='mt-7 '>
            {/* <Cardinfo budgetList={budgetList} /> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                <CreateBudget refreshData={() => getBudgetList()} />
                {budgetList?.length > 0 ? budgetList.map((budget, index) => (
                    <BudgetItem budget={budget} key={index} />
                )) : [1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index} className='w-full  bg-slate-200 rounded-lg h-[143px] animate-pulse' />
                ))}
            </div>
        </div>
    );
}

export default BudgetList;
