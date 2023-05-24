import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { getStorage, ref } from 'firebase/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  storage = getStorage()
  constructor() {}
  uploadImage(image: File, path: string): Observable<string> {
    
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}