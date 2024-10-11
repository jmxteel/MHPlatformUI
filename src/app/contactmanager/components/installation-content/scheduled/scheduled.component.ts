import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';

import { ColDef, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { GridDataModel } from '../../../Model/grid-data-model';
import { OrderForm } from '../../components-models/order-form.model';
import { Pagination } from '../../components-models/pagination.model';
import { InstallationDataService } from '../installation-content-data.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss']
})
export class ScheduledComponent implements OnInit, OnDestroy {
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

  constructor(private installationService: InstallationDataService) 
  {
    this.columnDefs = this.populateColumns();
    this.gridOptions = {
      pagination: true,
      rowModelType: 'infinite',
      // cacheBlockSize: this.pagination?.PageSize,
      // paginationPageSize: this.pagination?.PageSize,
      onGridReady: this.onGridReady.bind(this),
    };
    this.loadDataSetupStream();
  }

  ngOnInit(): void {
  }

  //Onchage data setup stream
  loadDataSetupStream(){
    this.subscription = this.installationService.getCustomers().subscribe(data => {
      this.loading = false
      this.customerData = data.body;
      this.pagination = JSON.parse(data.headers.get('X-Pagination'));

      //Inititalize AG Grid options
      if(this.customerData) {
      }
    })   
  }

  //Create column automatically
  createColumnDefs(data: any): ColDef[] {
    return Object.keys(data[0]).map(key => ({
      headerName: this.formatHeaderName(key),
      field: key,
      filter: true
    }))
  }

  //Static column definition
  populateColumns(): ColDef[] {
    return [
    { headerName: 'OrderNo', field: 'ordrno', filter: true },
    { headerName: 'Name', field: 'cName', filter: true },
    { headerName: 'Surname', field: 'cSurname', filter: true },
    { headerName: 'Address', field: 'cAdd', filter: true },
    { headerName: 'Installtion Address', field: 'insAdd', filter: true },
    ] as ColDef[];
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
}
