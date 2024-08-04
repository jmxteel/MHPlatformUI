import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { ColDef, GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { ProductionDataServices } from './production-content-data.service';
import { Employee, EmployeeTable } from './model/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { ClientTable } from './model/production-content.model';
import { OrderForm } from '../components-models/order-form.model';
import { Pagination } from '../components-models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';
import { ClientTable } from './models/production-content.models';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-production-content',
  templateUrl: './production-content.component.html',
  styleUrls: ['./production-content.component.scss']
})
export class ProductionContentComponent implements OnInit {
  //@ViewChild('myGrid') myGrid: AgGridAngular;

  gridOptions: Partial<GridOptions>;
  gridApi: any;
  gridColumnApi: any;
  columnDefs;
  cacheOverflowSize;
  maxConcurrentDatasourceRequests;
  infiniteInitialRowCount;
  pagination!: Pagination;

  rowData: any;

  constructor(private productionDataService: ProductionDataServices) { 
    this.columnDefs = [
      { headerName: 'Order No.', field: 'ordrno', sortable: true },
      { headerName: 'Title', field: 'ctitle', sortable: true },
      { headerName: 'Name', field: 'cName', sortable: true },
      { headerName: 'Surname', field: 'cSurname', sortable: true },
      { headerName: 'Address', field: 'cAdd', sortable: true },
      { headerName: 'Address2', field: 'insAdd', sortable: true },
      { headerName: 'Contact', field: 'cCon', sortable: true },
      { headerName: 'Mobile', field: 'cmobile', sortable: true },
      { headerName: 'Fax', field: 'cFax', sortable: true },
      { headerName: 'Contact', field: 'conPrsn', sortable: true },
    ];

    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 2;

    this.gridOptions = {
      headerHeight: 45,
      rowHeight: 30,
      rowModelType: 'infinite',
      onGridReady: this.onGridReady.bind(this),
    }    
  }

  onGridReady(params: any) {
    console.log('On Grid Ready');

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit(); // Size columns to fit the available width    

    this.gridApi.setDatasource({
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of users
        console.log("Fetching startRow " + params.startRow + " of " + params.endRow);
        console.log(params);
        this.productionDataService.getCustomers()
          .subscribe((data: any) => { 
            this.pagination = JSON.parse(data.headers.get('X-Pagination'));
            this.rowData = data.body;
            console.log(data);
            params.successCallback(this.rowData, this.pagination.PageSize) 
          });
      }
    });

    
  }

  // onPaginationChanged() {

  // }  

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
