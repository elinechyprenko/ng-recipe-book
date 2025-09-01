import { TestBed } from '@angular/core/testing';

import { UploadRecipesPreviewServiceService } from './upload-recipes-preview-service.service';
import { provideHttpClient } from '@angular/common/http';

describe('UploadRecipesPreviewServiceService', () => {
  let service: UploadRecipesPreviewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(UploadRecipesPreviewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
