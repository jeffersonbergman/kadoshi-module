
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { formatCurrency } from '@/utils/finance/formatters';

interface BarChartProps {
  data: any[];
}

interface PieChartProps {
  data: any[];
}

// Color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9B87F5', '#7E69AB', '#ea384c'];

export const MonthlyBarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), '']}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Legend />
          <Bar dataKey="entrada" name="Entradas" fill="#0EA5E9" />
          <Bar dataKey="saida" name="Saídas" fill="#ea384c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryPieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [formatCurrency(value), 'Valor']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
