import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

describe('MapPopupService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
