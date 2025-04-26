import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  ChevronLeft, 
  FileText, 
  Mic, 
  FileMusic, 
  Share, 
  Download, 
  RotateCcw, 
  BookText,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ListOrdered,
  Undo,
  Redo
} from 'lucide-react';
import { ChordEditor } from './ChordEditor';
import { LyricsPreview } from './LyricsPreview';

type SongEditorProps = {
  songId?: string;
  onBack: () => void;
}

export const SongEditor: React.FC<SongEditorProps> = ({ songId, onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('lyrics');
  const [title, setTitle] = useState(songId ? 'Grande é o Senhor' : '');
  const [artist, setArtist] = useState(songId ? 'Adhemar de Campos' : '');
  const [tone, setTone] = useState(songId ? 'E' : '');
  const [bpm, setBpm] = useState(songId ? '80' : '');
  const [lyrics, setLyrics] = useState(songId ? 
    "Grande é o Senhor e mui digno de louvor\nNa cidade do nosso Deus, seu santo monte\nAllegria de toda terra\n\nGrande é o Senhor em quem nós temos a vitória\nQue nos ajuda contra o inimigo\nPor isso diante dele nos prostramos" : 
    ''
  );
  const [chords, setChords] = useState(songId ? 
    "E             B/D#       C#m\nGrande é o Senhor e mui digno de louvor\nA                E/G#      F#m      B\nNa cidade do nosso Deus, seu santo monte\nE/G#      A           B\nAllegria de toda terra\n\nE             B/D#       C#m\nGrande é o Senhor em quem nós temos a vitória\nA         E/G#   F#m         B\nQue nos ajuda contra o inimigo\nE/G#         A               B      E\nPor isso diante dele nos prostramos" : 
    ''
  );
  
  const handleSave = () => {
    toast({
      title: "Música salva",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1" size={16} />
          <span>Voltar para Repertórios</span>
        </Button>
        <Button onClick={handleSave} className="flex items-center w-full sm:w-auto">
          <Save className="mr-2" size={16} />
          <span>Salvar</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>{songId ? 'Editar Música' : 'Nova Música'}</CardTitle>
              <CardDescription>
                {songId ? 'Edite os detalhes da música e sua partitura' : 'Preencha os detalhes da nova música'}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                <Share size={16} className="mr-2" />
                <span>Compartilhar</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                <Download size={16} className="mr-2" />
                <span>Exportar PDF</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Título da música" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist">Artista</Label>
              <Input 
                id="artist" 
                value={artist} 
                onChange={(e) => setArtist(e.target.value)} 
                placeholder="Nome do artista/compositor" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tom</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">C (Dó)</SelectItem>
                  <SelectItem value="D">D (Ré)</SelectItem>
                  <SelectItem value="E">E (Mi)</SelectItem>
                  <SelectItem value="F">F (Fá)</SelectItem>
                  <SelectItem value="G">G (Sol)</SelectItem>
                  <SelectItem value="A">A (Lá)</SelectItem>
                  <SelectItem value="B">B (Si)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bpm">BPM</Label>
              <Input 
                id="bpm" 
                type="number" 
                value={bpm} 
                onChange={(e) => setBpm(e.target.value)} 
                placeholder="Batidas por minuto" 
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="lyrics" className="flex items-center">
                <FileText size={16} className="mr-2" />
                <span>Letra e Cifra</span>
              </TabsTrigger>
              <TabsTrigger value="chord-pro" className="flex items-center">
                <FileMusic size={16} className="mr-2" />
                <span>Editor de Acordes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lyrics" className="space-y-4 mt-4">
              <div className="border rounded-md p-2">
                <div className="flex items-center space-x-1 mb-2 pb-2 border-b">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Bold size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Italic size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Underline size={16} />
                  </Button>
                  <span className="border-r h-6 mx-1"></span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <AlignLeft size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <AlignCenter size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <AlignRight size={16} />
                  </Button>
                  <span className="border-r h-6 mx-1"></span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Undo size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Redo size={16} />
                  </Button>
                </div>
                <Textarea 
                  placeholder="Cole ou digite a letra com cifra aqui. Coloque os acordes acima das palavras correspondentes."
                  className="min-h-[300px] font-mono"
                  value={chords}
                  onChange={(e) => setChords(e.target.value)}
                />
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <BookText size={16} className="mr-2" />
                  Prévia da Letra
                </h3>
                <LyricsPreview content={chords} />
              </div>
            </TabsContent>

            <TabsContent value="chord-pro" className="space-y-4 mt-4">
              <ChordEditor 
                content={chords} 
                onChange={setChords} 
                currentKey={tone} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" size="sm" onClick={onBack} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave} className="w-full sm:w-auto">
            <Save size={16} className="mr-2" />
            Salvar Música
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
