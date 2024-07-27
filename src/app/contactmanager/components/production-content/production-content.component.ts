import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductionDataServices } from './production-content-data.service';
import { Employee, EmployeeTable } from './model/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { ClientTable } from './model/production-content.model';
import { OrderForm } from '../components-models/order-form.model';
import { Pagination } from '../components-models/pagination.model';

@Component({
  selector: 'app-production-content',
  templateUrl: './production-content.component.html',
  styleUrls: ['./production-content.component.scss']
})
export class ProductionContentComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  filter?: string;
  q?: string;
  pagination!: Pagination;
  displayedColumns: string[] = [
    'ordrno',
    'ctitle',
    'cName',
    'cSurname',
    'cAdd',
    'insAdd',
    'cmobile',
  ];

  empTable?: ClientTable;

  totalData?: number;

  EmpData?: OrderForm[];

  dataSource = new MatTableDataSource<OrderForm>();

  isLoading = false;

  constructor(public empService: ProductionDataServices, private cd: ChangeDetectorRef) {
    this.loading = false;
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizes = [20,50,100];

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this.empService.getCustomers(pageNumber, pageSize, this.filter='', this.q='');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((empData) => {
          if (empData == null) return [];
          this.pagination = JSON.parse(empData.headers.get('X-Pagination')) as Pagination
          this.totalData = this.pagination.TotalItemCount;
          Promise.resolve().then(() => this.isLoading = false);
          
          return empData.body;
        })
      )
      .subscribe((empData) => {
        this.EmpData = empData;
        this.dataSource = new MatTableDataSource(this.EmpData);
      });
  }

}
