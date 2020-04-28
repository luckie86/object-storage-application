import { Component, OnInit } from '@angular/core';
import { BucketService } from '../core/bucket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationsService } from '../core/locations.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.css']
})
export class BucketsComponent implements OnInit {

  createNewBucketForm: FormGroup;
  buckets: [];
  locations: [];
  createNewBucketFlag = false;
  destroyed = new Subject<any>();;

  constructor(private router: Router, private locationsService: LocationsService, private bucketService: BucketService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.bucketService.getBuckets().subscribe((response: any) => {
        this.buckets = response.bucketsFromCurrentUser;
      });
    });

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
    this.bucketService.saveBucket(this.createNewBucketForm.value.bucketName, this.createNewBucketForm.value.bucketLocation)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
