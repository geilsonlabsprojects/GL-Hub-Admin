import React, { useState } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  aspectRatio?: 'square' | 'video' | 'portrait';
  helpText?: string;
  isUploading?: boolean;
  progress?: number;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  onRemove,
  aspectRatio = 'square',
  helpText,
  isUploading,
  progress = 0,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[9/16]',
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Logic for handling file would go here or passed from parent
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div
        className={cn(
          "relative group overflow-hidden rounded-2xl border-2 border-dashed transition-all",
          dragActive ? "border-primary-500 bg-primary-50/50 dark:bg-primary-900/10" : "border-gray-300 dark:border-gray-700 hover:border-primary-400",
          ratios[aspectRatio],
          value ? "border-solid" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {value ? (
          <>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove();
                }}
                leftIcon={<X className="h-4 w-4" />}
              >
                Remover
              </Button>
            </div>
          </>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
                <div className="w-32 bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary-500 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{progress}%</span>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-2">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Clique para upload
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  ou arraste e solte o arquivo
                </span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  // Logic handled by parent usually
                  console.log("File selected:", e.target.files[0]);
                }
              }}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {helpText && (
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <ImageIcon className="h-3 w-3" />
          {helpText}
        </p>
      )}
    </div>
  );
};
