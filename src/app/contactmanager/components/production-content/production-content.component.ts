import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductionDataServices } from './production-content-data.service';
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
export class ProductionContentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['ordrno', 'ctitle', 'cName', 'cSurname', 'cAdd', 'insAdd', 'cmobile'];
  dataSource$ = new Observable<ClientTable[]>();
  pageTotal?: number;
  pagination!: Pagination;
  filters = {filter: '',q: '', pageNumber: 1, pageSize: 20};
  private filtersSubject$ = new BehaviorSubject(this.filters);
  pageSizes = [50, 75, 100];
  searching?: boolean = false;
  searchedQuery?: string;

  rowData: any;
  isLoading = false;

  constructor(private productionDataService: ProductionDataServices) {}


  ngOnInit(): void {
    this.getDataFromApi();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.isLoading = true;
      this.filters.pageNumber = this.paginator.pageIndex + 1;
      this.filters.pageSize = this.paginator.pageSize
      this.filtersSubject$.next(this.filters);
    });
  }

  getDataFromApi() {
    this.dataSource$ = this.filtersSubject$.pipe(
      switchMap((filters: any) => {
        return this.productionDataService.getCustomers(filters).pipe(
          map((data) => {
            this.isLoading = false;
            this.pagination = JSON.parse(data.headers.get('X-Pagination')) as Pagination;
            this.pageTotal = this.pagination.TotalItemCount;
            return data.body;
          }),
          catchError(() => {
            this.pageTotal = 0;
            return of([]);
          })
        );
      })
    );
  }

  applyFilter(event: Event, filterValue: string) {
    if(filterValue.length > 2) {
      this.filters.q = filterValue.toLocaleLowerCase();
      this.searching = true;
      this.searchedQuery = filterValue;
      this.filtersSubject$.next(this.filters);
    };
  }

  resetFilter(){
    this.filters.q = '';
    this.searching = false;
    this.filtersSubject$.next(this.filters);
  }
}
