
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from 'lucide-react';
import { formatCurrency } from '@/utils/finance/formatters';

interface ReportData {
  id: string;
  title: string;
  description: string;
  data: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    topCategories: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
  };
}

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportData | null;
}

const ReportDialog: React.FC<ReportDialogProps> = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {report.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="text-sm text-muted-foreground">
            {report.description}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 space-y-1">
              <div className="text-sm text-muted-foreground">Entradas</div>
              <div className="text-xl font-semibold text-green-600">
                {formatCurrency(report.data.totalIncome)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 space-y-1">
              <div className="text-sm text-muted-foreground">Saídas</div>
              <div className="text-xl font-semibold text-red-600">
                {formatCurrency(report.data.totalExpenses)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 space-y-1">
              <div className="text-sm text-muted-foreground">Saldo</div>
              <div className={`text-xl font-semibold ${
                report.data.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(report.data.balance)}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Principais Categorias</h3>
            <div className="space-y-2">
              {report.data.topCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.percentage}% do total
                    </div>
                  </div>
                  <div className="font-semibold">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
