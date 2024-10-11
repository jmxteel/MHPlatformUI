import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';

import { ColDef, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { GridDataModel } from '../../../Model/grid-data-model';
import { OrderForm } from '../../components-models/order-form.model';
import { Pagination } from '../../components-models/pagination.model';
import { InstallationDataService } from '../installation-content-data.service';
import { CellMenuRendererComponent } from '../cell-menu-renderer/cell-menu-renderer.component';

@Component({
  selector: 'app-for-schedule',
  templateUrl: './for-schedule.component.html',
  styleUrls: ['./for-schedule.component.scss']
})
export class ForScheduleComponent implements OnInit, OnDestroy {
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
    }

    this.subscription = this.installationService.getCustomers().subscribe(data => {
      this.loading = false
      this.customerData = data.body;
      // this.columnDefs = this.createColumnDefs(this.customerData);
      // this.columnDefs = this.populateColumns();
      this.pagination = JSON.parse(data.headers.get('X-Pagination'));

      //Inititalize AG Grid options
      if(this.customerData) {
        // this.gridOptions = {
        //   pagination: true,
        //   rowModelType: 'infinite',
        //   cacheBlockSize: this.pagination?.PageSize,
        //   paginationPageSize: this.pagination?.PageSize,
        //   onGridReady: this.onGridReady.bind(this),
        // }
      }
    })
  }

  ngOnInit(): void {
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
    { headerName: '', field: '', filter: false,   width: 20,  colId: 'action', 
      cellRenderer: CellMenuRendererComponent,
    },
    { headerName: 'OrderNo', field: 'ordrno', filter: true, width: 100 },
    { headerName: 'Name', field: 'cName', filter: true },
    { headerName: 'Surname', field: 'cSurname', filter: true },
    { headerName: 'Address', field: 'cAdd', filter: true },
    { headerName: 'Installtion Address', field: 'insAdd', filter: true }
    ] as ColDef[];
  }

  onCellClicked(params: any) {
    if (
      params.event.target.dataset.action == 'toggle' &&
      params.column.getColId() == 'action'
    ) {
      const cellRendererInstances = params.api.getCellRendererInstances({
        rowNodes: [params.node],
        columns: [params.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        instance.togglePopup();
      }
    }
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
    suppressServerSideFullWidthLoadingRow: true,
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
