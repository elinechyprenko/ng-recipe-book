import { TestBed } from '@angular/core/testing';

import { RecipesService } from './recipes.service';
import { provideHttpClient } from '@angular/common/http';

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(RecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
