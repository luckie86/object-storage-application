// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  STORAGE_KEY: "token",
  AUTHORIZATION_TOKEN: "84DCC106-A7D0-4945-A494-C6F3F32D58AD",
  ROUTES: {
    REGISTER_ROUTE: "http://localhost:3000/auth/register",
    LOGIN_ROUTE: "http://localhost:3000/auth/login",
    GET_USER_ROUTE: "",
    LOCATIONS_ROUTE: "http://localhost:3000/locations",
    CREATE_NEW_BUCKET_ROUTE: "http://localhost:3000/buckets/save",
    GET_BUCKETS_ROUTE: "http://localhost:3000/buckets",
    GET_BUCKET_ROUTE: "http://localhost:3000/bucket/edit/",
    DELETE_BUCKET_ROUTE: "http://localhost:3000/bucket/delete/"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
