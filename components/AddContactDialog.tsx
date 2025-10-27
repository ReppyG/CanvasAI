import React, { useState } from 'react';
import { ChatIcon, PlusIcon } from './Icons';

interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContactDialog: React.FC<AddContactDialogProps> = ({ isOpen, onClose }) => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddContact = () => {
    setError(null);
    if (userId.trim().length !== 9 || !/^\d{9}$/.test(userId.trim())) {
      setError('Please enter a valid 9-digit user ID.');
      return;
    }
    
    // In a real application, you would add the contact to the database.
    // For now, we'll show an alert and close the dialog.
    alert(`Contact with ID ${userId} added successfully! (Simulation)`);
    setUserId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-primary"><ChatIcon /></div>
            <h2 className="text-lg font-semibold text-text-primary">Add New Contact</h2>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
        </header>
        
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="user-id" className="text-sm font-medium text-text-secondary mb-1 block">Friend's User ID</label>
            <input
              id="user-id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter 9-digit ID"
              maxLength={9}
              className="w-full bg-background p-2 rounded-md border border-border focus:ring-primary focus:border-primary"
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <footer className="p-4 border-t border-border">
          <button
            onClick={handleAddContact}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center"
          >
            <PlusIcon /> <span className="ml-2">Add Contact</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddContactDialog;
