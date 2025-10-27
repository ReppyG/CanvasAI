import React, { useState } from 'react';
import PageHeader from './ui/PageHeader';
import Card from './ui/Card';
import { PlusIcon } from './Icons';
import NewNoteDialog from './NewNoteDialog';

const Notes: React.FC = () => {
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  return (
    <>
      <div className="p-8 h-full">
        <PageHeader title="Notes" description="Keep track of your personal study notes">
          <button onClick={() => setIsNoteDialogOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
              <PlusIcon/> <span className="ml-2">New Note</span>
          </button>
        </PageHeader>
        
        <div className="flex items-center justify-center pt-16">
          <Card onClick={() => setIsNoteDialogOpen(true)} className="w-full max-w-sm text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-card-hover border-2 border-dashed border-border flex items-center justify-center mb-4 text-text-secondary">
                  <PlusIcon/>
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Create your first note</h3>
              <p className="text-text-secondary mt-1">Keep your thoughts and study materials organized.</p>
          </Card>
        </div>
      </div>
      {isNoteDialogOpen && (
        <NewNoteDialog 
          isOpen={isNoteDialogOpen}
          onClose={() => setIsNoteDialogOpen(false)}
        />
      )}
    </>
  );
};

export default Notes;