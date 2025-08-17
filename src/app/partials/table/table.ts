import { Component, OnInit, input, signal, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule, MatCellDef } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatCellDef, MatSortModule, MatButtonModule ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table implements OnInit, AfterViewInit {
  //för skärmläsare
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  //properties och hämtar interfacet
  courses: Course[] = [];
  displayedColumns: string[] = ["code", "coursename", "progression"];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
  


  constructor(private coursesService: CoursesService) {}

  ngOnInit() { //kan testa byta ut coursesArray i pilen till courses
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

  sortCourses(direction: "desc") {
    this.displayedColumns.forEach(column => {
      this.sort.sort({id: column, start: direction, disableClear: true})
    })
  }

}
