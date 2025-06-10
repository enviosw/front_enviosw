// utils/validateImageFiles.ts
export interface ValidateImageResult {
  validFiles: File[];
  errors: string[];
}

export const validateImageFiles = (
  files: FileList | File[],
  maxSizeKB: number = 500
): ValidateImageResult => {
  const validFiles: File[] = [];
  const errors: string[] = [];

  Array.from(files).forEach((file) => {
    const sizeInKB = file.size / 1024;

    if (sizeInKB > maxSizeKB) {
      errors.push(`"${file.name}" supera los ${maxSizeKB} KB`);
    } else {
      validFiles.push(file);
    }
  });

  return { validFiles, errors };
};
