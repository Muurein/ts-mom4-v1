import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule, MatCellDef } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';



@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatCellDef, MatSortModule, MatButtonModule ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})


export class Table implements OnInit, AfterViewInit {

  //properties och interface
  courses: Course[] = [];
  displayedColumns: string[] = ["code", "coursename", "progression"];
  dataSource = new MatTableDataSource<Course>([]);

  //inleder sortering
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }


  //konstruktor
  constructor(private coursesService: CoursesService) {}


  //när sidan laddas in
  ngOnInit() { 

    this.coursesService.getCourses().subscribe((courses) => {

      this.courses = courses;
      this.dataSource.data = this.courses;

    });
  }

  
  //filtrera datan efter kurskod, kursnamn och progression
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Course, filter: string) => {
      const searchTerms = filter.split(' ');

      return searchTerms.every(term =>
        data.code.toLowerCase().includes(term) ||
        data.coursename.toLowerCase().includes(term)
      );
    };
  }

  
  //sortering
  sortCourses(direction: "desc") {
    this.displayedColumns.forEach(column => {
      this.sort.sort({id: column, start: direction, disableClear: true})
    })
  }

}
