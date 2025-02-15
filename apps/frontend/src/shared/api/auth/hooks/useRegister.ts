import { useMutation } from '@tanstack/react-query';
import { authService } from '../auth.service';

export const useRegister = () =>
  useMutation({
    mutationKey: [authService.getQueryKey('register')],
    mutationFn: authService.register,
  });
