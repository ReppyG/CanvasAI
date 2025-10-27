import React, { useState, useRef, useEffect } from 'react';
import PageHeader from './ui/PageHeader';
import Card from './ui/Card';
import { PlusIcon, GeminiLogo, SendIcon } from './Icons';
import AddContactDialog from './AddContactDialog';
import { Contact, Message } from '../types';
import { useGemini } from '../contexts/GeminiContext';
import { Chat } from '@google/genai';
import MarkdownRenderer from './MarkdownRenderer';


const PeerChat: React.FC = () => {
  const { ai, error: initError } = useGemini();
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialContacts: Contact[] = [
    { 
      id: 'ai-assistant', 
      name: 'AI Study Assistant', 
      avatar: <GeminiLogo />,
      isAi: true
    }
  ];

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hello! I'm your AI Study Assistant. How can I help you with your coursework today?", sender: 'assistant' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initError);

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (selectedContact?.isAi && ai) {
      chatRef.current = ai.chats.create({ model: 'gemini-2.5-flash' });
    } else {
      chatRef.current = null;
    }
  }, [selectedContact, ai]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || isLoading || !ai) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    setError(null);

    try {
      if (!chatRef.current) {
        throw new Error("Chat is not initialized.");
      }
      const result = await chatRef.current.sendMessage({ message: newMessage });
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: result.text,
        sender: 'assistant',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
       const errorMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry, something went wrong. ${message}`,
        sender: 'assistant',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-8 h-full flex flex-col">
        <PageHeader title="Peer Chat" description="Connect and collaborate with your friends and classmates">
          <button onClick={() => setIsAddContactOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
              <PlusIcon/> <span className="ml-2">Add Contact</span>
          </button>
        </PageHeader>
        
        <div className="mb-4">
          <p className="text-sm text-text-secondary">Your ID: <span className="font-mono text-text-primary bg-card px-2 py-1 rounded">136164317</span></p>
        </div>
        
        <div className="grid grid-cols-12 gap-6 flex-grow min-h-0">
          <div className="col-span-4 lg:col-span-3">
            <Card className="h-full p-2">
              <h3 className="font-semibold text-text-primary mb-2 px-2">Contacts</h3>
              <div className="space-y-1">
                {contacts.map(contact => (
                  <button 
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full text-left p-2 rounded-md flex items-center transition-colors ${selectedContact.id === contact.id ? 'bg-primary/20' : 'hover:bg-card-hover'}`}
                  >
                    <div className="w-8 h-8 rounded-full flex-shrink-0">{contact.avatar}</div>
                    <span className="ml-3 font-medium text-sm text-text-primary">{contact.name}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
          <div className="col-span-8 lg:col-span-9 flex flex-col">
            <Card className="h-full flex-grow flex flex-col">
              {selectedContact ? (
                <>
                  <header className="p-3 border-b border-border flex items-center">
                     <div className="w-8 h-8 rounded-full">{selectedContact.avatar}</div>
                     <h3 className="ml-3 font-semibold text-text-primary">{selectedContact.name}</h3>
                  </header>
                  <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                          {msg.sender === 'assistant' && <div className="w-6 h-6 rounded-full flex-shrink-0"><GeminiLogo/></div>}
                          <div className={`max-w-lg px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-card-hover text-text-primary'}`}>
                            <MarkdownRenderer content={msg.text} />
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                         <div className="flex items-end gap-2">
                           <div className="w-6 h-6 rounded-full"><GeminiLogo/></div>
                           <div className="px-4 py-2 rounded-xl bg-card-hover text-text-primary">
                             <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-150"></span>
                                <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-300"></span>
                             </div>
                           </div>
                         </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <footer className="p-3 border-t border-border">
                    <div className="flex items-center bg-background rounded-lg">
                      <input 
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Message ${selectedContact.name}...`}
                        className="w-full bg-transparent p-2 focus:outline-none text-text-primary"
                        disabled={isLoading || !!initError}
                      />
                      <button onClick={handleSendMessage} disabled={isLoading || !newMessage.trim()} className="p-2 text-primary rounded-full hover:bg-primary/10 disabled:text-text-tertiary disabled:hover:bg-transparent">
                        <SendIcon />
                      </button>
                    </div>
                  </footer>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-text-secondary">Select a contact to start messaging</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      {isAddContactOpen && (
        <AddContactDialog 
          isOpen={isAddContactOpen}
          onClose={() => setIsAddContactOpen(false)}
        />
      )}
    </>
  );
};

export default PeerChat;