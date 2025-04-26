
/**
 * Finance exporters utility functions
 * Contains functions for exporting financial data to various formats (CSV, Excel, PDF)
 */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency, formatDate, formatDateForFilename } from './formatters';

// Export transactions to CSV
export const exportToCSV = (data: any[], filename: string = 'transacoes'): void => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  const csvContent = [headers, ...rows].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}_${formatDateForFilename(new Date())}.csv`);
};

// Export transactions to Excel
export const exportToExcel = (data: any[], filename: string = 'transacoes'): void => {
  // Format data for Excel
  const formattedData = data.map(item => ({
    Data: formatDate(item.date),
    Descrição: item.description,
    Categoria: item.category,
    Tipo: item.type === 'entrada' ? 'Entrada' : 'Saída',
    Valor: formatCurrency(item.amount)
  }));
  
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transações');
  
  // Generate Excel file
  XLSX.writeFile(workbook, `${filename}_${formatDateForFilename(new Date())}.xlsx`);
};

// Export transactions to PDF
export const exportToPDF = (data: any[], filename: string = 'transacoes'): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Relatório Financeiro', 14, 22);
  
  // Add date
  doc.setFontSize(11);
  doc.text(`Gerado em: ${formatDate(new Date().toISOString())}`, 14, 30);
  
  // Format data for table
  const tableData = data.map(item => [
    formatDate(item.date),
    item.description,
    item.category,
    item.type === 'entrada' ? 'Entrada' : 'Saída',
    formatCurrency(item.amount)
  ]);
  
  // Add table
  (doc as any).autoTable({
    startY: 40,
    head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 66, 66] }
  });
  
  // Save PDF
  doc.save(`${filename}_${formatDateForFilename(new Date())}.pdf`);
};
