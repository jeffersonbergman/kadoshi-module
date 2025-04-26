
/**
 * Finance formatters utility functions
 * Contains functions for formatting currency, dates, and other financial data
 */

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // Check if the date is valid before formatting
    if (isNaN(date.getTime())) {
      return '';
    }
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Helper to format date for filenames
export const formatDateForFilename = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0].replace(/-/g, '');
  }
  return date.toISOString().split('T')[0].replace(/-/g, '');
};
