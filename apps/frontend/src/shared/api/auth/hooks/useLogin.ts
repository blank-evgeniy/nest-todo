import { useMutation } from '@tanstack/react-query';
import { authService } from '../auth.service';
import { AuthRequestData, LoginResponse } from '@/shared/types/auth';

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
}

export const useLogin = (options?: UseLoginOptions) =>
  useMutation({
    mutationKey: [authService.getQueryKey('login')],
    mutationFn: (data: AuthRequestData) => authService.login(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
