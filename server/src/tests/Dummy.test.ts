import { Dummy } from '@models/Dummy';

test('it should be ok', () => {
  const user = new Dummy();

  user.name = 'Talita';

  expect(user.name).toEqual('Talita');
});
