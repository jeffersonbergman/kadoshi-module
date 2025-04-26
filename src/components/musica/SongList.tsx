import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  FileMusic, 
  Edit, 
  Trash2, 
  ChevronRight, 
  Eye, 
  Music, 
  Search,
  FileText,
  Plus 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  bpm?: number;
  lastUpdated: string;
}

interface SongListProps {
  songs: Song[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onNew: () => void;
}

export const SongList: React.FC<SongListProps> = ({ 
  songs, 
  onEdit, 
  onDelete, 
  onView, 
  onNew 
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterKey, setFilterKey] = React.useState('');
  
  const filteredSongs = songs.filter(song => {
    const matchesSearch = searchQuery ? 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) : 
      true;
      
    const matchesKey = filterKey ? song.key === filterKey : true;
    
    return matchesSearch && matchesKey;
  });
  
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta música?')) {
      onDelete(id);
      toast({
        title: "Música excluída",
        description: "A música foi excluída com sucesso.",
      });
    }
  };
  
  const handleView = (id: string) => {
    onView(id);
    toast({
      title: "Visualizando música",
      description: "Carregando detalhes da música...",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por título ou artista..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={filterKey} onValueChange={setFilterKey}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por Tom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_keys">Todos os Tons</SelectItem>
              <SelectItem value="C">C (Dó)</SelectItem>
              <SelectItem value="D">D (Ré)</SelectItem>
              <SelectItem value="E">E (Mi)</SelectItem>
              <SelectItem value="F">F (Fá)</SelectItem>
              <SelectItem value="G">G (Sol)</SelectItem>
              <SelectItem value="A">A (Lá)</SelectItem>
              <SelectItem value="B">B (Si)</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={onNew} className="w-full sm:w-auto whitespace-nowrap">
            <Plus size={16} className="mr-2" />
            Nova Música
          </Button>
        </div>
      </div>
      
      {filteredSongs.length === 0 ? (
        <div className="text-center py-10 border rounded-md bg-gray-50">
          <Music size={48} className="mx-auto text-gray-300 mb-2" />
          <h3 className="text-lg font-medium">Nenhuma música encontrada</h3>
          <p className="text-gray-500 mb-4">Tente ajustar os filtros ou adicione novas músicas ao repertório</p>
          <Button onClick={onNew}>
            <FileMusic size={16} className="mr-2" />
            Adicionar Música
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSongs.map(song => (
            <div key={song.id} className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3 shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium truncate">{song.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {song.artist} • Tom: {song.key} {song.bpm && `• ${song.bpm} BPM`} • Atualizado em {song.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <div className="flex -space-x-1 sm:space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleView(song.id)}
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => onEdit(song.id)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleDelete(song.id)}
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden sm:flex items-center"
                    onClick={() => handleView(song.id)}
                  >
                    <span>Ver Música</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
