import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private http: HttpClient) { }

  saveBucket(bucketName:string, bucketLocation: string) {
    return this.http.post(environment.ROUTES.CREATE_NEW_BUCKET_ROUTE, {bucketName, bucketLocation});
  }

  getBuckets() {
    return this.http.get(environment.ROUTES.GET_BUCKETS_ROUTE);
  }

  getBucket(uuid: string) {
    return this.http.get(`${environment.ROUTES.GET_BUCKET_ROUTE}${uuid}`);
  }

  deleteBucket(uuid: string) {
    return this.http.delete(`${environment.ROUTES.DELETE_BUCKET_ROUTE}${uuid}`)
  }

}
