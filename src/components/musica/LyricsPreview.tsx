
import React from 'react';

interface LyricsPreviewProps {
  content: string;
}

export const LyricsPreview: React.FC<LyricsPreviewProps> = ({ content }) => {
  return (
    <div className="overflow-x-auto max-w-full">
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 break-words min-w-[300px]">
        {content}
      </pre>
    </div>
  );
};
