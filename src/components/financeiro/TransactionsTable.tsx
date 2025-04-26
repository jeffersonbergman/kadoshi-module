
import React from 'react';
import { formatCurrency, formatDate } from '@/utils/finance/formatters';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface TransactionsTableProps {
  transactions: Array<{
    id: string;
    date: string;
    description: string;
    category: string;
    type: string;
    amount: number;
  }>;
  categoryMap: Record<string, {name: string; type: string}>;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, categoryMap }) => {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50">
                  <TableCell>{transaction.date ? formatDate(transaction.date) : '-'}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {categoryMap[transaction.category] && (
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        categoryMap[transaction.category].type === 'entrada' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {categoryMap[transaction.category].name}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className={`text-right ${
                    transaction.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhuma transação encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;
