import React from 'react';
import { Plus, X, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, Reorder } from 'framer-motion';

interface ScreenshotManagerProps {
  screenshots: string[];
  onChange: (screenshots: string[]) => void;
  onUpload: () => void;
  isUploading?: boolean;
}

export const ScreenshotManager: React.FC<ScreenshotManagerProps> = ({
  screenshots,
  onChange,
  onUpload,
  isUploading,
}) => {
  const removeScreenshot = (index: number) => {
    const newScreenshots = [...screenshots];
    newScreenshots.splice(index, 1);
    onChange(newScreenshots);
  };

  const moveScreenshot = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index > 0) {
      const newScreenshots = [...screenshots];
      const temp = newScreenshots[index];
      newScreenshots[index] = newScreenshots[index - 1];
      newScreenshots[index - 1] = temp;
      onChange(newScreenshots);
    } else if (direction === 'right' && index < screenshots.length - 1) {
      const newScreenshots = [...screenshots];
      const temp = newScreenshots[index];
      newScreenshots[index] = newScreenshots[index + 1];
      newScreenshots[index + 1] = temp;
      onChange(newScreenshots);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Screenshots</h3>
          <p className="text-xs text-gray-500">Formato celular (9:16). Até 8 imagens.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onUpload}
          isLoading={isUploading}
          disabled={screenshots.length >= 8}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Adicionar
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {screenshots.map((url, index) => (
          <motion.div
            key={url}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-[9/16] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800"
          >
            <img src={url} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <Button
                variant="danger"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeScreenshot(index)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex gap-1 mt-auto w-full justify-between">
                <Button
                  variant="tonal"
                  size="icon"
                  className="h-8 w-8 bg-white/20 text-white hover:bg-white/40"
                  onClick={() => moveScreenshot(index, 'left')}
                  disabled={index === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="tonal"
                  size="icon"
                  className="h-8 w-8 bg-white/20 text-white hover:bg-white/40"
                  onClick={() => moveScreenshot(index, 'right')}
                  disabled={index === screenshots.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md">
              #{index + 1}
            </div>
          </motion.div>
        ))}

        {screenshots.length === 0 && !isUploading && (
          <div className="col-span-full py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400">
            <Plus className="h-8 w-8 mb-2 opacity-20" />
            <span className="text-sm">Nenhuma screenshot adicionada</span>
          </div>
        )}
      </div>
    </div>
  );
};
