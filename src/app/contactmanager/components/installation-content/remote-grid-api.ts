import { GridApi, IGetRowsParams } from 'ag-grid-community';
import { Observable } from 'rxjs';

export interface RemoteGridApi {
  getData: (params: IGetRowsParams) => Observable<{ data: any; totalRecords: any}>;
  getDataError: (err: any) => void;
  gridApi: GridApi;
}