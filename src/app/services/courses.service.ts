import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';


@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  //properties
  url: string = "https://webbutveckling.miun.se/files/ramschema.json";

  constructor(private http: HttpClient) {

  } 

  //hämta kurser
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}


