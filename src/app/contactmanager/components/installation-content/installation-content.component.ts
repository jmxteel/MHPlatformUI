import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InstallationDataService } from './installation-content-data.service';
import { Observable, Subscription, catchError, of, tap } from 'rxjs';

import { ColDef, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { GridDataModel } from '../../Model/grid-data-model';
import { OrderForm } from '../components-models/order-form.model';
import { Pagination } from '../components-models/pagination.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { ForScheduleComponent } from './for-schedule/for-schedule.component';
import { OnGoingComponent } from './on-going/on-going.component';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrls: ['./installation-content.component.scss']
})
export class InstallationContentComponent implements OnInit {
  @ViewChild(ForScheduleComponent) ForScheduleComponent!: ForScheduleComponent;
  @ViewChild(ScheduledComponent) scheduledComponent!: ScheduledComponent;
  @ViewChild(OnGoingComponent) onGoingComponent!: OnGoingComponent;


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
  htmlRef: any = 0;

  constructor(private installationService: InstallationDataService,) { }

  ngOnInit(): void {
    // this.subscription = this.installationService.getCustomers().subscribe(data => {
    //   this.loading = false
    //   this.customerData = data.body;
    //   // this.columnDefs = this.createColumnDefs(this.customerData);
    //   this.columnDefs = this.populateColumns();
    //   this.pagination = JSON.parse(data.headers.get('X-Pagination'));

    //   //Inititalize AG Grid options
    //   if(this.customerData) {
    //     this.gridOptions = {
    //       pagination: true,
    //       rowModelType: 'infinite',
    //       cacheBlockSize: this.pagination?.PageSize,
    //       paginationPageSize: this.pagination?.PageSize,
    //       onGridReady: this.onGridReady.bind(this),
    //     }
    //   }
    // })
    // this.onChangeDataSetupStream();
  }

  //Onchage data setup stream
  // onChangeDataSetupStream(){
  //   this.subscription = this.installationService.getCustomers().subscribe(data => {
  //     this.loading = false
  //     this.customerData = data.body;
  //     // this.columnDefs = this.createColumnDefs(this.customerData);
  //     this.columnDefs = this.populateColumns();
  //     this.pagination = JSON.parse(data.headers.get('X-Pagination'));

  //     //Inititalize AG Grid options
  //     if(this.customerData) {
  //       this.gridOptions = {
  //         pagination: true,
  //         rowModelType: 'infinite',
  //         cacheBlockSize: this.pagination?.PageSize,
  //         paginationPageSize: this.pagination?.PageSize,
  //         onGridReady: this.onGridReady.bind(this),
  //       }
  //     }
  //   })   
  // }

  //Create column automatically
  // createColumnDefs(data: any): ColDef[] {
  //   return Object.keys(data[0]).map(key => ({
  //     headerName: this.formatHeaderName(key),
  //     field: key,
  //     filter: true
  //   }))
  // }

  //Static column definition
  // populateColumns(): ColDef[] {
  //   return [
  //   { headerName: 'OrderNo', field: 'ordrno', filter: true },
  //   { headerName: 'Name', field: 'cName', filter: true },
  //   { headerName: 'Surname', field: 'cSurname', filter: true },
  //   { headerName: 'Address', field: 'cAdd', filter: true },
  //   { headerName: 'Installtion Address', field: 'insAdd', filter: true },
  //   ] as ColDef[];
  // }

  // formatHeaderName(key: string): string {
  //   // Optional: format the header name if needed, e.g., 'cName' => 'C Name'
  //   return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
  // }

  // defaultColDef = {
  //   sortable: true,
  //   resizable: false
  // };

  // gridOptions: GridOptions = {
  //   rowModelType: 'infinite',
  //   cacheBlockSize: this.pagination?.PageSize,
  //   paginationPageSize: this.pagination?.PageSize,
  //   onGridReady: this.onGridReady.bind(this),
  // }

  // private onGridReady(params: any): void {
  //   this.gridApi = params.api;
  //   this.gridApi.setDomLayout('autoHeight');
  //   // this.gridApi.sizeColumnsToFit(); // Size columns to fit the available width
  //   this.resizeColumns();
  //   this.gridApi.setDatasource({
  //     getRows: (params: IGetRowsParams) => {
  //       this.getData(params)
  //       params.successCallback(this.customerData, 20)
  //     }
  //   })
  // } 

  // getData(params: IGetRowsParams): Observable<GridDataModel> {
  //   return of({data: this.customerData, totalRecords: this.pagination?.TotalItemCount});
  // }  

  // getDataError!: (err: any) => void;

  // ngOnDestroy(): void {
  //   this.subscription!.unsubscribe(); 
  // }

  // resizeColumns() {
  //   if (this.gridApi) {
  //     this.gridApi.sizeColumnsToFit();
  //   }
  // }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index){
      case 0:
        this.htmlRef = 0;
        break;
      case 1:
        this.htmlRef = 1;
        this.scheduledComponent.loadDataSetupStream();
        break;
      case 2:
        this.htmlRef = 2;
        this.onGoingComponent.loadDataSetupStream();        
        break;
      case 3:
        this.htmlRef = 3;
        this.onGoingComponent.loadDataSetupStream();            
        break;        
    }
  } 
}
