/* global expect */
import { normalizeLongitude, normalize } from './normalize';

describe('normalizeLongitude', () => {

  it('should return identity', () => {
    expect(normalizeLongitude(20)).toEqual(20);
  });

  it('should truncate longitude', () => {
    expect(normalizeLongitude(200)).toEqual(-160);
  });

  it('should truncate longitude', () => {
    expect(normalizeLongitude(-200)).toEqual(160);
  });

  it('should truncate longitude more than 360', () => {
    expect(normalizeLongitude(200 + 360 * 2)).toEqual(-160);
  });

  it('should truncate longitude less than ', () => {
    expect(normalizeLongitude(200 - 360 * 2)).toEqual(-160);
  });

});

describe('normalize', () => {

  it('should return identity', () => {
    expect(normalize([10, 20])).toEqual([10, 20]);
  });

  it('should return identity', () => {
    expect(normalize([200, 20])).toEqual([-160, 20]);
  });

  it('should return identity', () => {
    expect(normalize([10, 100])).toEqual([-170, 80]);
  });

});
