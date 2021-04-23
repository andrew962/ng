import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';
import { CurrentUser } from '../interfaces/currentUser.model';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uid: string;
  user: CurrentUser;
  authSubscription: Subscription;
  downloadURL: Observable<string>;
  constructor(
    private fStorage: AngularFireStorage,
    private auth: AuthenticationService,
    private userService: UserService
  ) {
    this.authSubscription = this.auth.currentUser$.subscribe(u => {
      this.user = u;
      this.uid = u?.Uid
    });
  }
  upload(file, fileName?: string, path: string = 'images') {
    let filePath: string = `${this.uid}/${path}/${fileName}`
    let fileRef = this.fStorage.ref(filePath);
    return this.fStorage.upload(filePath, file).snapshotChanges().pipe(concatMap(r => fileRef.getDownloadURL()));
  }
  getFile(filePath) {
    this.fStorage.ref(filePath).getDownloadURL().subscribe(r => {
      console.log(r)
    })
    // let filePath: string = `${this.uid}/${path}`
    // const fileRef = this.fStorage.ref(filePath);
    // this.downloadURL = fileRef.getDownloadURL();
    // return this.downloadURL.subscribe(r => {
    //   console.log(r)
    // })
  }
}
