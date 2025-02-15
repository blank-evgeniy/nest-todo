import { axiosClassic } from '../../config/api/api';

class ProfileService {
  private BASE_URL = '/profile';

  getQueryKey() {
    return [this.BASE_URL];
  }

  async getProfile() {
    const response = await axiosClassic.get<ProfileService>(this.BASE_URL);

    return response.data;
  }
}

export const profileService = new ProfileService();
