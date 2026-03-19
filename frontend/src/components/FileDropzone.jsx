import { useRef, useState } from 'react';

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
      className={`panel flex min-h-72 cursor-pointer flex-col items-center justify-center border-2 border-dashed p-8 text-center transition ${
        isDragging ? 'border-slatebrand-500 bg-slatebrand-50' : 'border-slatebrand-200'
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
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slatebrand-100 text-2xl">
        +
      </div>
      <h3 className="mt-6 text-xl font-bold text-slatebrand-900">Drop a nail image here</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slatebrand-600">
        PNG or JPG images are accepted. Choose a clear close-range image of the affected nail for the most reliable severity estimate.
      </p>
      {file ? (
        <div className="mt-6 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slatebrand-700 shadow-soft">
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
