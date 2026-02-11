export interface ImageState {
  file: File | null;
  previewUrl: string | null;
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export interface ProcessingError {
  message: string;
  details?: string;
}
