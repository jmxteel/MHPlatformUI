import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { ColDef, GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community'; // Column Definition Type Interface
import { ProductionDataServices } from './production-content-data.service';
import { Pagination } from '../components-models/pagination.model';

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
}
