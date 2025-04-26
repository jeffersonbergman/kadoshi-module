
/**
 * Chart data preparation utility functions
 * Contains functions for preparing data for different chart types
 */

// Prepare chart data by month
export const prepareMonthlyChartData = (transactions: any[]) => {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  // Initialize data structure
  const chartData = months.map(name => ({
    name,
    entrada: 0,
    saida: 0
  }));
  
  // Group transactions by month
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthIndex = date.getMonth();
    
    if (transaction.type === 'entrada') {
      chartData[monthIndex].entrada += transaction.amount;
    } else {
      chartData[monthIndex].saida += transaction.amount;
    }
  });
  
  return chartData;
};

// Prepare pie chart data for category distribution
export const prepareCategoryChartData = (transactions: any[], categories: any[]) => {
  // Create a map for quick category lookups
  const categoryMap = categories.reduce((map, cat) => {
    map[cat.id] = cat.name;
    return map;
  }, {} as Record<string, string>);
  
  // Group by category
  const categoryTotals: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    const categoryName = categoryMap[transaction.category] || 'Sem categoria';
    if (!categoryTotals[categoryName]) {
      categoryTotals[categoryName] = 0;
    }
    categoryTotals[categoryName] += transaction.amount;
  });
  
  // Convert to array format for charts
  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));
};
