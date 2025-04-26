
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface Report {
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

interface ReportsListProps {
  reports: Report[];
  onViewReport: (reportId: string) => void;
}

const ReportsList: React.FC<ReportsListProps> = ({ reports, onViewReport }) => {
  return (
    <ul className="space-y-2">
      {reports.map((report) => (
        <li key={report.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
          <div className="flex items-center">
            <FileText size={18} className="mr-3 text-church-primary" />
            <div>
              <p className="font-medium">{report.title}</p>
              <p className="text-xs text-gray-500">{report.description}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewReport(report.id)}
          >
            Visualizar
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ReportsList;
