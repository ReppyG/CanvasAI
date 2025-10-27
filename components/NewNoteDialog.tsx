import React from 'react';
import { NotesIcon, PlusIcon } from './Icons';

interface NewNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewNoteDialog: React.FC<NewNoteDialogProps> = ({ isOpen, onClose }) => {
  
  const handleSaveNote = () => {
      // In a real app, this would save the note.
      alert('Note saved! (Simulation)');
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-primary"><NotesIcon /></div>
            <h2 className="text-lg font-semibold text-text-primary">Create a New Note</h2>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
        </header>
        
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          <div>
            <label htmlFor="note-title" className="text-sm font-medium text-text-secondary mb-1 block">Title</label>
            <input
              id="note-title"
              type="text"
              placeholder="Enter note title..."
              className="w-full bg-background p-2 rounded-md border border-border focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="note-content" className="text-sm font-medium text-text-secondary mb-1 block">Content</label>
            <textarea
              id="note-content"
              rows={12}
              placeholder="Start writing your note here..."
              className="w-full bg-background p-2 rounded-md border border-border focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <footer className="p-4 border-t border-border">
          <button
            onClick={handleSaveNote}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center"
          >
            <PlusIcon /> <span className="ml-2">Save Note</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewNoteDialog;
