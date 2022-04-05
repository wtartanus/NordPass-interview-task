import itemHasOldPassword from '../itemHasOldPassword';
import { IItem } from '../../services/getUserItems';

describe('should return true if password is too old', () => {
  test.each([
    [
      true,
      {
        createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
      }
    ],
    [
      false,
      {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
      }
    ],
    [
      true,
      {
        createdAt: new Date(new Date().setMonth(new Date().getDate() - 31)).toISOString(),
      }
    ]
  ])('should return %s', (expectedResult, item) => {
    expect(itemHasOldPassword(item as IItem)).toBe(expectedResult);
  })
});