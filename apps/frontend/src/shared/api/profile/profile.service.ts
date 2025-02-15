import { Profile } from '@/shared/types/profile';
import { axiosWithAuth } from '../../config/api/api';

class ProfileService {
  private BASE_URL = '/profile';

  getQueryKey() {
    return [this.BASE_URL];
  }

  async getProfile() {
    const response = await axiosWithAuth.get<Profile>(this.BASE_URL);

    return response.data;
  }
}

export const profileService = new ProfileService();
