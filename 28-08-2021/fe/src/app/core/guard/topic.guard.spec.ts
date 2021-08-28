import { TestBed } from '@angular/core/testing';

import { TopicGuard } from './topic.guard';

describe('TopicGuard', () => {
  let guard: TopicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TopicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
