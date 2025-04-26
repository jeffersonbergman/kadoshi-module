
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertCircle, Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ 
  isOpen, 
  onClose, 
  onImport
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [step, setStep] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Read CSV file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const csvData = event.target.result;
          const rows = csvData.split('\n');
          const headers = rows[0].split(',');
          
          const parsedData = rows.slice(1).map(row => {
            if (!row.trim()) return null; // Skip empty rows
            
            const values = row.split(',');
            const obj: any = {};
            
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim() || '';
            });
            
            return obj;
          }).filter(item => item !== null);
          
          setPreviewData(parsedData.slice(0, 5)); // Show first 5 rows for preview
          setStep(2);
        }
      };
      
      reader.readAsText(selectedFile);
    }
  };

  const handleImport = () => {
    // Read full file content and process
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const csvData = event.target.result;
          const rows = csvData.split('\n');
          const headers = rows[0].split(',');
          
          const parsedData = rows.slice(1).map(row => {
            if (!row.trim()) return null;
            
            const values = row.split(',');
            const obj: any = {};
            
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim() || '';
            });
            
            // Format to match our data structure
            return {
              id: Math.random().toString(36).substr(2, 9),
              description: obj.description || obj.descricao || '',
              amount: parseFloat(obj.amount || obj.valor || '0'),
              date: obj.date || obj.data || new Date().toISOString().split('T')[0],
              category: obj.category || obj.categoria || '',
              type: (obj.type || obj.tipo || '').toLowerCase() === 'entrada' ? 'entrada' : 'saida'
            };
          }).filter(item => item !== null);
          
          onImport(parsedData);
          toast({
            title: "Importação concluída",
            description: `${parsedData.length} transações foram importadas com sucesso!`
          });
          
          // Reset and close
          setFile(null);
          setPreviewData([]);
          setStep(1);
          onClose();
        }
      };
      
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importar Dados Financeiros</DialogTitle>
          <DialogDescription>
            Importe dados de um arquivo CSV para adicionar transações em lote.
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Clique para selecionar ou arraste um arquivo CSV</p>
                <p className="text-xs text-gray-400">Formatos suportados: .csv</p>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="csvFile" className="mt-4">
                  <Button variant="outline" type="button">Selecionar Arquivo</Button>
                </Label>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex">
                  <AlertCircle size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Formato esperado do CSV</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      O arquivo deve conter cabeçalhos como: description/descricao, amount/valor, date/data, category/categoria, type/tipo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
            </DialogFooter>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Check size={18} className="text-green-600" />
                <span className="text-sm font-medium">Arquivo carregado: {file?.name}</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Visualização dos dados:</h4>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      {previewData.length > 0 && (
                        <TableRow>
                          {Object.keys(previewData[0]).map(header => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      )}
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value, i) => (
                            <TableCell key={i}>{String(value)}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Mostrando {previewData.length} de {file ? 'múltiplas' : '0'} linhas.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setFile(null);
                setPreviewData([]);
                setStep(1);
              }}>
                Voltar
              </Button>
              <Button onClick={handleImport}>Importar Dados</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
