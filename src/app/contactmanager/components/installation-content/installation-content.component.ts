import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstallationDataService } from './installation-content-data.service';
import { Observable, Subscription, of } from 'rxjs';

import { ColDef, GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { RemoteGridApi } from './remote-grid-api';
import { GridDataModel } from '../../Model/grid-data-model';
import { OrderForm } from '../components-models/order-form.model';
import { Pagination } from '../components-models/pagination.model';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrls: ['./installation-content.component.scss']
})
export class InstallationContentComponent implements OnInit, RemoteGridApi, OnDestroy {
  folders: any;
  loading = true;
  private subscription: Subscription | undefined;
  // gridApi: any;
  gridApi!: any;
  cardHeight: number = 0; // Initialize cardHeight
  remoteGridBinding = this;
  gridData!: GridDataModel;
  customerData: OrderForm[] = [];
  columnDefs: ColDef[] = [];
  pagination?: Pagination;

  constructor(private installationService: InstallationDataService,) { }

  ngOnInit(): void {
    this.subscription = this.installationService.getCustomers().subscribe(data => {
      this.loading = false
      this.customerData = data.body;
      this.columnDefs = this.createColumnDefs(this.customerData);
      this.pagination = JSON.parse(data.headers.get('X-Pagination'));
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
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: this.pagination?.PageSize,
    paginationPageSize: this.pagination?.PageSize,
    onGridReady: this.onGridReady.bind(this),
  }

  private onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit(); // Size columns to fit the available width
  } 

  // getData(params: any): Observable<{data: any, totalRecords: any}> {
  //   return of({data: this.rowData, totalRecords: 85});
  // }  

  // getData(params: IGetRowsParams): Observable<GridDataModel> {
  //   return of({data: this.rowData, totalRecords: 85});
  // }  

  getData(params: IGetRowsParams): Observable<GridDataModel> {
    return of({data: this.customerData, totalRecords: this.pagination?.TotalItemCount});
  }  

  getDataError!: (err: any) => void;

  ngOnDestroy(): void {
    this.subscription!.unsubscribe(); 
  }

}
