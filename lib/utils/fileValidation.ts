const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validatePDF(file: File): string | null {
  if (!file.type.includes('pdf')) {
    return 'Only PDF files are allowed';
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 10MB';
  }
  
  return null;
}