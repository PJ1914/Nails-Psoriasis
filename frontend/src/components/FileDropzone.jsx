import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function FileDropzone({ file, onFileSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (incomingFiles) => {
    const nextFile = incomingFiles?.[0];

    if (!nextFile) {
      return;
    }

    onFileSelect(nextFile);
  };

  return (
    <div
      className={`panel relative w-full overflow-hidden flex min-h-72 cursor-pointer flex-col items-center justify-center border-2 border-dashed p-4 sm:p-8 text-center transition ${
        isDragging ? 'border-slatebrand-500 bg-slatebrand-50 dark:border-slatebrand-400 dark:bg-slatebrand-800/80' : 'border-slatebrand-200 dark:border-slatebrand-700'
      }`}
      onClick={() => inputRef.current?.click()}
      onDragEnter={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slatebrand-100 dark:bg-slatebrand-800 text-slatebrand-700 dark:text-white shadow-inner transition-colors">
        <UploadCloud className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <h3 className="mt-6 text-xl font-bold text-slatebrand-900 dark:text-white">Drop a nail image here</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slatebrand-600 dark:text-slatebrand-300">
        PNG or JPG images are accepted. Choose a clear close-range image of the affected nail for the most reliable severity estimate.
      </p>
      {file ? (
        <div className="mt-6 w-full max-w-[80vw] sm:max-w-[400px] truncate rounded-2xl bg-white dark:bg-slatebrand-700 px-4 py-3 text-sm font-semibold text-slatebrand-700 dark:text-slatebrand-200 shadow-soft" title={file.name}>
          Selected: {file.name}
        </div>
      ) : (
        <button type="button" className="button-primary mt-6">
          Select Image
        </button>
      )}
    </div>
  );
}
