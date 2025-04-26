
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/finance/formatters';

interface FinancialSummaryProps {
  summary: {
    currentBalance: number;
    currentIncome: number;
    currentExpenses: number;
    incomeChange: number;
    expensesChange: number;
  };
}

const FinancialSummaryCards: React.FC<FinancialSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base font-medium flex items-center">
            <DollarSign size={18} className="mr-2 text-church-primary" />
            Saldo Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.currentBalance)}</div>
          <p className="text-xs text-gray-500 mt-1">Atualizado em {formatDate(new Date().toISOString())}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base font-medium flex items-center">
            <TrendingUp size={18} className="mr-2 text-green-600" />
            Entradas do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.currentIncome)}</div>
          <p className={`text-xs mt-1 ${summary.incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {summary.incomeChange >= 0 ? '+' : ''}{summary.incomeChange.toFixed(0)}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base font-medium flex items-center">
            <TrendingDown size={18} className="mr-2 text-red-600" />
            Saídas do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.currentExpenses)}</div>
          <p className={`text-xs mt-1 ${summary.expensesChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {summary.expensesChange >= 0 ? '+' : ''}{summary.expensesChange.toFixed(0)}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummaryCards;
