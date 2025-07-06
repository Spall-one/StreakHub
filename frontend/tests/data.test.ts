import { streamers } from '../src/lib/data';

describe('sample data', () => {
  it('contains two streamers', () => {
    expect(streamers).toHaveLength(2);
  });
});
