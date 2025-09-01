import { TestBed } from '@angular/core/testing';

import { SharedDataService } from './shared-data.service';
import { provideHttpClient } from '@angular/common/http';

describe('SharedDataService', () => {
  let service: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
