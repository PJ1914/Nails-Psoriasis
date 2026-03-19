import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileDropzone from '../components/FileDropzone';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { predictReport } from '../services/reportService';
import { uploadScanImage } from '../services/storageService';

export default function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleSubmit = async () => {
    if (!file || !user) {
      setError('Please choose an image before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const imageUrl = await uploadScanImage(file, user.uid);
      const response = await predictReport(imageUrl);
      navigate(`/results/${response.report_id}`);
    } catch (requestError) {
      setError(requestError.message || 'Unable to process the uploaded image.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Image workflow"
        title="Upload a nail image for NAPSI scoring"
        description="Use a clear close-range image. The file will be stored in Firebase Storage and sent to the Flask API for inference."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <FileDropzone file={file} onFileSelect={setFile} />

        <div className="panel p-6">
          <h2 className="text-2xl font-bold text-slatebrand-900">Preview and submit</h2>
          <p className="mt-3 muted-text">Verify the image before initiating the prediction pipeline.</p>

          <div className="mt-6 overflow-hidden rounded-3xl bg-slatebrand-100">
            {previewUrl ? (
              <img src={previewUrl} alt="Selected nail" className="h-[360px] w-full object-cover" />
            ) : (
              <div className="flex h-[360px] items-center justify-center text-sm font-semibold text-slatebrand-500">
                Image preview will appear here.
              </div>
            )}
          </div>

          {error ? <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <button type="button" className="button-primary mt-6 w-full" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Uploading and analyzing...' : 'Upload and Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
}
