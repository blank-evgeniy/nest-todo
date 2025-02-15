import { useMutation } from '@tanstack/react-query';
import { authService } from '../auth.service';

export const useLogin = () =>
  useMutation({ mutationKey: [authService.getQueryKey('login')], mutationFn: authService.login });
