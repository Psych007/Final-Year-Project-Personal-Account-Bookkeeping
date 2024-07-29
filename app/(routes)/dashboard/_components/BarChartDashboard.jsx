import React from 'react'
import { BarChart,XAxis,YAxis,Legend,Tooltip,Bar,ResponsiveContainer } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='p-5 border rounded-lg'>
        <h2 className='font-bold text-lg'>Activity</h2>

<ResponsiveContainer width={"80%"} height={300}>

      <BarChart data={budgetList} margin={{top:7}}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
  <Bar dataKey="amount" stackId="a" fill="#C2C3FF" />
</BarChart>

</ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard
