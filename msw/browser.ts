import { handlers } from '@/services/api/handlers';
import { setupWorker } from 'msw/browser';
export const worker = setupWorker(...handlers);