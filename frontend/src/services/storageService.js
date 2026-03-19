import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';

export async function uploadScanImage(file, userId) {
  const extension = file.name.split('.').pop();
  const storageRef = ref(
    storage,
    `nail-scans/${userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`
  );

  await uploadBytes(storageRef, file, {
    contentType: file.type,
  });

  return getDownloadURL(storageRef);
}
