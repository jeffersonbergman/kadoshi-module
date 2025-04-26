
/**
 * Finance analyzers utility functions
 * Contains functions for analyzing financial data, calculating summaries, and preparing chart data
 */

// Calculate financial summary data
export const calculateFinancialSummary = (transactions: any[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });
  
  // Calculate totals
  const income = currentMonthTransactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = currentMonthTransactions
    .filter(t => t.type === 'saida')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = income - expenses;
  
  // Calculate previous month for comparison
  const prevMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return transactionDate.getMonth() === prevMonth && 
           transactionDate.getFullYear() === prevYear;
  });
  
  const prevIncome = prevMonthTransactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const prevExpenses = prevMonthTransactions
    .filter(t => t.type === 'saida')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate percentage change
  const incomeChange = prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 100;
  const expensesChange = prevExpenses > 0 ? ((expenses - prevExpenses) / prevExpenses) * 100 : 100;
  
  return {
    currentBalance: balance,
    currentIncome: income,
    currentExpenses: expenses,
    incomeChange,
    expensesChange
  };
};
