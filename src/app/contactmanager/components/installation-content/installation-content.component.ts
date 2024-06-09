import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstallationDataService } from './installation-content-data.service';
import { Observable, Subscription, of } from 'rxjs';

import { ColDef, GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { RemoteGridApi } from './remote-grid-api';
import { GridDataModel } from '../../Model/grid-data-model';

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

  constructor(private installationService: InstallationDataService,) { }

  ngOnInit(): void {
    this.subscription = this.installationService.getFileFlows().subscribe(data => {
      setTimeout(() => {
        this.loading = false;
        this.folders = data;
      },1000);      
    });
  }

	columnDefs: ColDef[] = [
		{ headerName: 'Make', field: 'make', filter: true },
		{ headerName: 'Model', field: 'model', filter: true },
		{ headerName: 'Price', field: 'price', filter: true },
	];

  defaultColDef = {
    sortable: true,
    resizable: false
  };

	rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 }
	];

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: 17,
    paginationPageSize: 17,
    onGridReady: this.onGridReady.bind(this),
  }

  // onGridReady(params: any): void {
  //   this.gridApi = params.api;
  //   this.gridApi.setDomLayout('autoHeight');
  //   this.gridApi.sizeColumnsToFit(); // Size columns to fit the available width
  // }

  private onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit(); // Size columns to fit the available width
  } 

  // getData(params: any): Observable<{data: any, totalRecords: any}> {
  //   return of({data: this.rowData, totalRecords: 85});
  // }  

  getData(params: IGetRowsParams): Observable<GridDataModel> {
    return of({data: this.rowData, totalRecords: 85});
  }  

  getDataError!: (err: any) => void;

  ngOnDestroy(): void {
    this.subscription!.unsubscribe(); 
  }

}
