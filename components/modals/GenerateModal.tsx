// GenerateModal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useClipboard } from 'use-clipboard-copy';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import Button from '../Button';
import useGenerateModal from '@/hooks/useGenerateModal';

const GenerateModal: React.FC = () => {
  const { isOpen, closeModal } = useGenerateModal();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const clipboard = useClipboard();

  const handleSubmit = async () => {
    if (!prompt) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/openai', { prompt });
      setGeneratedContent(response.data.content);
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      title="Generate Content"
      actionLabel="Generate"
      disabled={isLoading}
      body={
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt"
            className="w-full h-32 p-2 text-black"
          />
          {generatedContent && (
            <div className="mt-4">
              <p className="text-white">{generatedContent}</p>
              <Button label="Copy Text" onClick={() => clipboard.copy(generatedContent)} />
            </div>
          )}
        </div>
      }
    />
  );
};

export default GenerateModal;
