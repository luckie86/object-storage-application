import { Component, OnInit } from '@angular/core';
import { BucketService } from '../core/bucket.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocationsService } from '../core/locations.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Response } from "../core/models/models";

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.css']
})
export class BucketsComponent implements OnInit {

  createNewBucketForm: FormGroup;
  buckets = [] as any;
  objects = [] as any;
  locations = [] as any;
  uploadedFiles;
  createNewBucketFlag = false;
  showBucketDetailsFlag = false;
  uploadObjectFlag = false;
  currentBucketUUID;
  formData;
  objectFormData;

  constructor(private loaderService: NgxUiLoaderService, private locationsService: LocationsService, private bucketService: BucketService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createNewBucketForm = this.formBuilder.group({
      bucketName: ['', Validators.required],
      bucketLocation: ['', Validators.required]
  });
    this.locationsService.getLocations().subscribe((response: any) => {
      this.locations = response.body.locations;
    });
    this.bucketService.getBuckets().subscribe((response: any) => {
      this.buckets = response.bucketsFromCurrentUser;
    });
  }

  openCreateForm() {
    this.createNewBucketFlag = true;
  }

  createNewBucket() {
    this.loaderService.startLoader("createNewBucket");
    this.bucketService.saveBucket(this.createNewBucketForm.value.bucketName, this.createNewBucketForm.value.bucketLocation)
      .subscribe((response: Response) => {
        this.buckets.push(response);
        this.loaderService.stopLoader("createNewBucket");
      });
  }

  showBucketDetails(bucketId: string) {
    this.currentBucketUUID = bucketId;
    this.showBucketDetailsFlag = true;
    this.bucketService.getObjects(bucketId).subscribe((response: any) => {
      this.objects = response.objectFormCurrentBucket;
    });
  }

  fileChange(event) {
    this.uploadedFiles = event.target.files;
  }

  uploadObject() {
    this.formData = new FormData();
    [...this.uploadedFiles].forEach(file => {
      this.formData.append("uploads", file, file.name);
      this.formData.append("bucketId", this.currentBucketUUID);
    });
    this.bucketService.uploadObject(this.formData).subscribe((response: any)=> {
      this.objects.push(response);
    });
  }

  deleteObject(objectId: string) {
    this.bucketService.deleteObject(objectId).subscribe((response: any) => {
      if (response.status) {
        this.objects = this.objects.filter(object => object.objectId !== objectId);
      }
    })
  }

  showUpload() {
    this.uploadObjectFlag = true;
  }
}
