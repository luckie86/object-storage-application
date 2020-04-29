import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  httpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  saveBucket(bucketName:string, bucketLocation: string) {
    return this.http.post(environment.ROUTES.CREATE_NEW_BUCKET_ROUTE, {bucketName, bucketLocation});
  }

  getBuckets() {
    return this.http.get(environment.ROUTES.GET_BUCKETS_ROUTE, this.httpUploadOptions);
  }

  getObjects(bucketId: string) {
    return this.http.get(`${environment.ROUTES.GET_OBJECTS_ROUTE}${bucketId}/objects`);
  }

  getObject(objectUUID: string) {
    return this.http.get(`${environment.ROUTES.GET_OBJECTS_ROUTE}${objectUUID}`);
  }

  deleteObject(bucketId) {
    return this.http.delete(`${environment.ROUTES.DELETE_OBJECT_ROUTE}${bucketId}/delete`);
  }

  uploadObject(formData) {
    return this.http.post(environment.ROUTES.UPLOAD_OBJECT_ROUTE, formData, this.httpUploadOptions)
  }

}
