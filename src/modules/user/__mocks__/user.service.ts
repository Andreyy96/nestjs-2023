import { MockServiceType } from '../../../../test/types/mock-service.type';
import { UserService } from '../services/user.service';

export const mockUserService: MockServiceType<UserService> = {
  getMe: jest.fn(),
  getById: jest.fn(),
  updateMe: jest.fn(),
  removeMe: jest.fn(),
  follow: jest.fn(),
  unfollow: jest.fn(),
  uploadAvatar: jest.fn(),
  deleteAvatar: jest.fn(),
  isEmailUniqueOrThrow: jest.fn(),
};
