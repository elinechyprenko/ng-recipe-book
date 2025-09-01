import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UploadStatus } from '../model/upload-status';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class UploadRecipesPreviewServiceService {

  constructor(private http: HttpClient) { }

  upload(recipeId: null | undefined | number, fileToUpload: File): Observable<UploadStatus> {
    const formData = new FormData();
    formData.append('FileToUpload', fileToUpload as File);
    return this.http.post<UploadStatus>(`${BASE_PATH}/recipes/upload/${recipeId}`, formData);
  }

}
