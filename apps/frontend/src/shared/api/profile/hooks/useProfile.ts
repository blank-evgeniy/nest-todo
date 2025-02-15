import { useQuery } from '@tanstack/react-query';
import { profileService } from '../profile.service';

export const useProfile = () =>
  useQuery({ queryKey: profileService.getQueryKey(), queryFn: profileService.getProfile });
