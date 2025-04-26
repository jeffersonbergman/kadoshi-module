
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Music, 
  ChevronUp, 
  ChevronDown, 
  RotateCcw, 
  MessageSquarePlus 
} from 'lucide-react';

interface ChordEditorProps {
  content: string;
  onChange: (content: string) => void;
  currentKey: string;
}

export const ChordEditor: React.FC<ChordEditorProps> = ({ 
  content, 
  onChange, 
  currentKey = 'C' 
}) => {
  const [selectedKey, setSelectedKey] = useState(currentKey);
  
  const transposeChord = (chord: string, semitones: number): string => {
    const chordRegex = /^([A-G][#b]?)(m|maj|min|M|aug|dim|sus[24]|add\d+|7|9|11|13|6|5|-5|\+5|°|ø|Δ)?([\/][A-G][#b]?)?$/;
    const match = chord.match(chordRegex);
    
    if (!match) return chord;
    
    const rootNote = match[1];
    const chordType = match[2] || '';
    const bassNote = match[3] || '';
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Handle flats
    const normalizedRoot = rootNote.replace('b', '#');
    const rootIndex = notes.indexOf(normalizedRoot);
    
    if (rootIndex === -1) return chord;
    
    const newRootIndex = (rootIndex + semitones + 12) % 12;
    let newRoot = notes[newRootIndex];
    
    // Handle bass note if present
    let newBass = '';
    if (bassNote) {
      const bassParts = bassNote.split('/');
      const bassOnly = bassParts[1];
      const normalizedBass = bassOnly.replace('b', '#');
      const bassIndex = notes.indexOf(normalizedBass);
      
      if (bassIndex !== -1) {
        const newBassIndex = (bassIndex + semitones + 12) % 12;
        newBass = '/'.concat(notes[newBassIndex]);
      } else {
        newBass = bassNote;
      }
    }
    
    return newRoot + chordType + newBass;
  };
  
  const transposeContent = (semitones: number) => {
    const chordRegex = /([A-G][#b]?(?:m|maj|min|M|aug|dim|sus[24]|add\d+|7|9|11|13|6|5|-5|\+5|°|ø|Δ)?(?:[\/][A-G][#b]?)?)/g;
    
    const newContent = content.replace(chordRegex, (match) => {
      return transposeChord(match, semitones);
    });
    
    onChange(newContent);
  };
  
  const transposeUp = () => transposeContent(1);
  const transposeDown = () => transposeContent(-1);
  
  const handleKeyChange = (key: string) => {
    setSelectedKey(key);
    // Ideally here we would calculate how many semitones to transpose
    // based on current key and new key, but a simple implementation:
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const currentIndex = keys.indexOf(currentKey);
    const newIndex = keys.indexOf(key);
    
    if (currentIndex !== -1 && newIndex !== -1) {
      transposeContent(newIndex - currentIndex);
    }
  };
  
  const resetToOriginal = () => {
    // This would reset to original key, but we'd need to store the original
    setSelectedKey(currentKey);
    onChange(content); // Ideally reset to original content
  };
  
  const insertChordMarker = () => {
    // Insert a chord marker at current cursor position
    // This would need to be implemented with cursor management
    onChange(content + '[C]');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Label htmlFor="key" className="whitespace-nowrap">Tom:</Label>
          <Select value={selectedKey} onValueChange={handleKeyChange}>
            <SelectTrigger className="w-full sm:w-24">
              <SelectValue placeholder="Tom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C">C (Dó)</SelectItem>
              <SelectItem value="C#">C# (Dó#)</SelectItem>
              <SelectItem value="D">D (Ré)</SelectItem>
              <SelectItem value="D#">D# (Ré#)</SelectItem>
              <SelectItem value="E">E (Mi)</SelectItem>
              <SelectItem value="F">F (Fá)</SelectItem>
              <SelectItem value="F#">F# (Fá#)</SelectItem>
              <SelectItem value="G">G (Sol)</SelectItem>
              <SelectItem value="G#">G# (Sol#)</SelectItem>
              <SelectItem value="A">A (Lá)</SelectItem>
              <SelectItem value="A#">A# (Lá#)</SelectItem>
              <SelectItem value="B">B (Si)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={transposeUp} 
            className="flex items-center w-full sm:w-auto"
          >
            <ChevronUp size={16} className="mr-1" />
            <span>Subir Tom</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={transposeDown} 
            className="flex items-center w-full sm:w-auto"
          >
            <ChevronDown size={16} className="mr-1" />
            <span>Baixar Tom</span>
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetToOriginal} 
            className="flex items-center w-full sm:w-auto"
          >
            <RotateCcw size={16} className="mr-1" />
            <span>Restaurar Original</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={insertChordMarker} 
            className="flex items-center w-full sm:w-auto"
          >
            <Music size={16} className="mr-1" />
            <span>Inserir Acorde</span>
          </Button>
        </div>
      </div>
      
      <Textarea 
        placeholder="Digite ou cole a cifra aqui..."
        className="min-h-[400px] font-mono"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
      
      <div className="bg-gray-50 p-4 rounded-md border mt-4">
        <h3 className="text-sm font-medium mb-2">Dicas para Edição</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Coloque acordes entre colchetes: [C] para marcá-los</li>
          <li>• Use linhas em branco para separar seções</li>
          <li>• Para indicar uma seção, adicione: {'{Intro}'}, {'{Verse}'}, {'{Chorus}'}</li>
          <li>• Para repetição use: {'{Repeat 2x}'}</li>
        </ul>
      </div>
    </div>
  );
};
