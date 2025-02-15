import { useMutation } from '@tanstack/react-query';
import { authService } from '../auth.service';
import { AuthRequestData, RegisterResponse } from '@/shared/types/auth';

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: unknown) => void;
}

export const useRegister = (options?: UseRegisterOptions) =>
  useMutation({
    mutationKey: [authService.getQueryKey('register')],
    mutationFn: (data: AuthRequestData) => authService.register(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
