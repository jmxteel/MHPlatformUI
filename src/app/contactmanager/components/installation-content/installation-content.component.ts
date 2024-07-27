import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstallationDataService } from './installation-content-data.service';
import { Observable, Subscription, catchError, of, tap } from 'rxjs';

import { ColDef, GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { GridDataModel } from '../../Model/grid-data-model';
import { OrderForm } from '../components-models/order-form.model';
import { Pagination } from '../components-models/pagination.model';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrls: ['./installation-content.component.scss']
})
export class InstallationContentComponent implements OnInit, OnDestroy {
  folders: any;
  loading = true;
  private subscription: Subscription | undefined;
  gridApi!: any;
  cardHeight: number = 0; // Initialize cardHeight
  gridData!: GridDataModel;
  customerData: OrderForm[] = [];
  columnDefs: ColDef[] = [];
  pagination?: Pagination;
  title = {forSchedule: 'For Schedule', scheduled: 'Scheduled', onGoing: 'on Going', forReturn: 'For Return', forCancellation: 'For Cancellation'};

  constructor(private installationService: InstallationDataService,) { }

  ngOnInit(): void {
    this.subscription = this.installationService.getCustomers().subscribe(data => {
      this.loading = false
      this.customerData = data.body;
      this.columnDefs = this.createColumnDefs(this.customerData);
      this.pagination = JSON.parse(data.headers.get('X-Pagination'));

      //Inititalize AG Grid options
      this.gridOptions = {
        pagination: true,
        rowModelType: 'infinite',
        cacheBlockSize: this.pagination?.PageSize,
        paginationPageSize: this.pagination?.PageSize,
        onGridReady: this.onGridReady.bind(this),
      }
    })
  }

//columnDefs: ColDef[] = this.createColumnDefs(this.customerData); 

createColumnDefs(data: any): ColDef[] {
  return Object.keys(data[0]).map(key => ({
    headerName: this.formatHeaderName(key),
    field: key,
    filter: true
  }))
}

formatHeaderName(key: string): string {
  // Optional: format the header name if needed, e.g., 'cName' => 'C Name'
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
}

  defaultColDef = {
    sortable: true,
    resizable: false
  };

  gridOptions: GridOptions = {
    rowModelType: 'infinite',
    cacheBlockSize: this.pagination?.PageSize,
    paginationPageSize: this.pagination?.PageSize,
    onGridReady: this.onGridReady.bind(this),
  }

  private onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit(); // Size columns to fit the available width
    this.gridApi.setDatasource({
      getRows: (params: IGetRowsParams) => {
        this.getData(params)
        params.successCallback(this.customerData, 20)
      }
    })
  } 

  getData(params: IGetRowsParams): Observable<GridDataModel> {
    return of({data: this.customerData, totalRecords: this.pagination?.TotalItemCount});
  }  

  getDataError!: (err: any) => void;

  ngOnDestroy(): void {
    this.subscription!.unsubscribe(); 
  }

  alertFunction(message?: string): void {
    alert('Alert Function' + message);
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index){
      case 0:
        this.alertFunction('Tab no 1');
        break;
      case 1:
        this.alertFunction('Tab no 2');
        break;
      case 2:
        this.alertFunction('Tab no 3');
        break;

    }
  } 
}
