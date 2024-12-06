import { TestBed } from '@angular/core/testing';

import { MapsStaticService } from './maps-static.service';

describe('MapsStaticService', () => {
  let service: MapsStaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsStaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
