import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, PlusCircle, Search, Filter, Calendar, FileText } from 'lucide-react';
import TransactionDialog from '@/components/financeiro/TransactionDialog';
import CategoryDialog from '@/components/financeiro/CategoryDialog';
import ImportDialog from '@/components/financeiro/ImportDialog';
import ReportDialog from '@/components/financeiro/ReportDialog';
import FinancialSummaryCards from '@/components/financeiro/FinancialSummaryCards';
import TransactionsTable from '@/components/financeiro/TransactionsTable';
import ReportsList from '@/components/financeiro/ReportsList';
import FinancialCharts from '@/components/financeiro/FinancialCharts';
import { 
  exportToCSV, exportToExcel, exportToPDF, 
  calculateFinancialSummary, prepareMonthlyChartData, prepareCategoryChartData
} from '@/utils/finance';

const sampleTransactions = [
  {
    id: '1',
    date: '2025-04-14',
    description: 'Dízimos e Ofertas (Culto Domingo)',
    category: '1',
    type: 'entrada',
    amount: 2350
  },
  {
    id: '2',
    date: '2025-04-12',
    description: 'Pagamento de Água e Luz',
    category: '3',
    type: 'saida',
    amount: 570
  },
  {
    id: '3',
    date: '2025-04-10',
    description: 'Dízimos e Ofertas (Culto Quarta)',
    category: '1',
    type: 'entrada',
    amount: 1150
  },
  {
    id: '4',
    date: '2025-04-08',
    description: 'Compra de Equipamentos de Som',
    category: '5',
    type: 'saida',
    amount: 1800
  },
  {
    id: '5',
    date: '2025-04-07',
    description: 'Dízimos e Ofertas (Culto Domingo)',
    category: '1',
    type: 'entrada',
    amount: 2250
  },
  {
    id: '6',
    date: '2025-03-30',
    description: 'Dízimos e Ofertas (Culto Domingo)',
    category: '1',
    type: 'entrada',
    amount: 1950
  },
  {
    id: '7',
    date: '2025-03-28',
    description: 'Salários Funcionários',
    category: '4',
    type: 'saida',
    amount: 2500
  },
  {
    id: '8',
    date: '2025-03-20',
    description: 'Receita Evento de Páscoa',
    category: '2',
    type: 'entrada',
    amount: 1500
  }
];

const sampleCategories = [
  { id: '1', name: 'Dízimos e Ofertas', type: 'entrada', description: 'Todas as contribuições financeiras' },
  { id: '2', name: 'Eventos', type: 'entrada', description: 'Receitas de eventos especiais' },
  { id: '3', name: 'Manutenção', type: 'saida', description: 'Despesas de manutenção do templo' },
  { id: '4', name: 'Salários', type: 'saida', description: 'Pagamento de funcionários' },
  { id: '5', name: 'Equipamentos', type: 'saida', description: 'Compra de equipamentos diversos' }
];

const sampleReports = [
  {
    id: '1',
    title: 'Balanço Financeiro Anual',
    description: 'Resumo completo das movimentações de 2025, incluindo análise detalhada por categoria e comparativo com o ano anterior.',
    data: {
      totalIncome: 8200,
      totalExpenses: 4870,
      balance: 3330,
      topCategories: [
        { name: 'Dízimos e Ofertas', amount: 7700, percentage: 94 },
        { name: 'Eventos', amount: 500, percentage: 6 },
      ],
    }
  },
  {
    id: '2',
    title: 'Relatório Mensal (Abril/2025)',
    description: 'Detalhamento das atividades financeiras no mês atual, incluindo todas as entradas e saídas categorizadas.',
    data: {
      totalIncome: 2350,
      totalExpenses: 570,
      balance: 1780,
      topCategories: [
        { name: 'Dízimos e Ofertas', amount: 2350, percentage: 100 },
        { name: 'Manutenção', amount: 570, percentage: 100 },
      ],
    }
  },
  {
    id: '3',
    title: 'Comparativo Semestral',
    description: 'Análise comparativa dos últimos 6 meses, mostrando tendências e variações nas principais categorias.',
    data: {
      totalIncome: 5850,
      totalExpenses: 4300,
      balance: 1550,
      topCategories: [
        { name: 'Dízimos e Ofertas', amount: 5350, percentage: 91 },
        { name: 'Eventos', amount: 500, percentage: 9 },
      ],
    }
  },
];

const Financeiro = () => {
  const { toast } = useToast();
  
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [categories, setCategories] = useState(sampleCategories);
  const [currentTab, setCurrentTab] = useState('movimentacoes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const summary = calculateFinancialSummary(transactions);
  const monthlyChartData = prepareMonthlyChartData(transactions);
  const categoryChartData = prepareCategoryChartData(transactions, categories);
  
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryMap = categories.reduce((map, cat) => {
    map[cat.id] = { name: cat.name, type: cat.type };
    return map;
  }, {} as Record<string, {name: string, type: string}>);

  const handleAddTransaction = (newTransaction: any) => {
    setTransactions([newTransaction, ...transactions]);
  };
  
  const handleAddCategory = (newCategory: any) => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === newCategory.id ? newCategory : cat
      ));
    } else {
      setCategories([...categories, newCategory]);
    }
  };
  
  const handleImportData = (importedData: any[]) => {
    setTransactions([...importedData, ...transactions]);
  };
  
  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };
  
  const handleExportData = (format: 'csv' | 'excel' | 'pdf') => {
    if (transactions.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Não há transações disponíveis para exportação.",
        variant: "destructive"
      });
      return;
    }
    
    const formattedTransactions = transactions.map(transaction => ({
      ...transaction,
      category: categoryMap[transaction.category]?.name || 'Sem categoria',
      type: transaction.type === 'entrada' ? 'Entrada' : 'Saída'
    }));
    
    try {
      switch (format) {
        case 'csv':
          exportToCSV(formattedTransactions);
          break;
        case 'excel':
          exportToExcel(formattedTransactions);
          break;
        case 'pdf':
          exportToPDF(formattedTransactions);
          break;
      }
      
      toast({
        title: "Exportação concluída",
        description: `Os dados foram exportados com sucesso no formato ${format.toUpperCase()}.`
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os dados. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleViewReport = (reportId: string) => {
    const report = sampleReports.find(r => r.id === reportId);
    setSelectedReport(report);
    setIsReportDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Módulo Financeiro</h1>
            <p className="text-gray-500">Gerencie todas as finanças da igreja em um só lugar</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => setIsImportDialogOpen(true)}
            >
              <Upload size={18} className="mr-2" /> Importar
            </Button>
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => handleExportData('csv')}
            >
              <Download size={18} className="mr-2" /> Exportar CSV
            </Button>
            <Button onClick={() => setIsTransactionDialogOpen(true)}>
              <PlusCircle size={18} className="mr-2" /> Nova Transação
            </Button>
          </div>
        </div>

        <FinancialSummaryCards summary={summary} />

        <Tabs defaultValue="movimentacoes" className="mb-6" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="categorias">Categorias</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movimentacoes" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Movimentações Recentes</CardTitle>
                    <CardDescription>Visualize e gerencie todas as entradas e saídas</CardDescription>
                  </div>
                  <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Buscar transações..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TransactionsTable 
                  transactions={filteredTransactions}
                  categoryMap={categoryMap}
                />
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">Carregar Mais</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categorias" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Categorias Financeiras</CardTitle>
                    <CardDescription>Gerencie as categorias de entradas e saídas</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryDialogOpen(true);
                  }}>
                    <FileText size={16} className="mr-2" /> Nova Categoria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TransactionsTable 
                  transactions={categories.map(cat => ({
                    id: cat.id,
                    date: '',
                    description: cat.description,
                    category: cat.id,
                    type: cat.type,
                    amount: 0
                  }))}
                  categoryMap={categoryMap}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="relatorios" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Relatórios Financeiros</CardTitle>
                    <CardDescription>Visualize e exporte relatórios detalhados</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportData('pdf')}
                    >
                      <FileText size={16} className="mr-2" /> PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportData('excel')}
                    >
                      <Download size={16} className="mr-2" /> Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <FinancialCharts 
                  monthlyChartData={monthlyChartData}
                  categoryChartData={categoryChartData}
                />
                <h3 className="font-semibold mb-3">Relatórios Disponíveis</h3>
                <ReportsList 
                  reports={sampleReports}
                  onViewReport={handleViewReport}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <TransactionDialog 
        isOpen={isTransactionDialogOpen}
        onClose={() => setIsTransactionDialogOpen(false)}
        onSave={handleAddTransaction}
        categories={categories}
      />
      
      <CategoryDialog 
        isOpen={isCategoryDialogOpen}
        onClose={() => {
          setIsCategoryDialogOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleAddCategory}
        editingCategory={editingCategory}
      />
      
      <ImportDialog 
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
        onImport={handleImportData}
      />
      
      <ReportDialog 
        isOpen={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        report={selectedReport}
      />
    </MainLayout>
  );
};

export default Financeiro;
