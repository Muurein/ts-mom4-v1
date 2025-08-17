import { Component, OnInit, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule, MatCellDef } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';




@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatCellDef],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table implements OnInit {
  //propoerties
  //hämtar interfacet
  courses: Course[] = [];
  displayedColumns: string[] = ["code", "coursename", "progression"];
  dataSource = new MatTableDataSource<Course>([]);

  constructor(private coursesService: CoursesService) {}

  ngOnInit() { //kan testa byta ut coursesArray i pilen till courses
    console.log("data från API: ", this.courses);
    this.coursesService.getCourses().subscribe((courses) => {

      this.courses = courses;
      this.dataSource.data = this.courses;

    });
  }


 
  //med signaler, lägg också till signal i import component
  // courses = signal<Course[]>([]);

  // coursesService = inject(CoursesService); //och lägg till inejct i import components
  

  // ngOnInit(): void {
  //   this.coursesService.getCourses().subscribe((courses: Course[]) => {
  //     this.courses.set(courses);
  //   });
  // }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
