import { ResponseT } from '@src/interfaces';

export const customResponse = <T>({
  data = null,
  success = false,
  error = true,
  message = 'Internal Server Error',
  status = 500
}: ResponseT<T>) => {
  return {
    data,
    success,
    error,
    message,
    status,
    stack: process.env.NODE_ENV === 'production' ? undefined : new Error().stack
  };
};

export default customResponse;
