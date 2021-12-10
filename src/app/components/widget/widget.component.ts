import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MessageService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';

import { FilterPayload } from '../../interfaces/filterPayload';
import { Record } from '../../interfaces/record';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  providers: [MessageService],
})
export class WidgetComponent implements OnInit {
  loading: boolean = true;
  totalRecords: number = 0;
  datasource: Record[] = [];
  records: Record[] = [];
  columns: Array<{ id: 'string'; type: 'string' }> = [];
  isApiError: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}
  getRecords(payload: FilterPayload) {
    this.httpService.getRecords(payload).subscribe({next:(res) => {
      this.loading = false;
      if (res.success) {
        this.isApiError = false;
        this.records = res.result.records;
        this.columns =
          this.columns.length == 0 ? res.result.fields : this.columns;
        this.totalRecords = res.result.total;
      } else {
        this.records = [];
        this.isApiError = true;
      }
    },
    error:error => {
      console.log(error);
      this.loading = false;
      this.isApiError = true;
  }});
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    const sortDirection = event.sortField
      ? event.sortOrder == 1
        ? 'asc'
        : 'desc'
      : '';
    let payload: FilterPayload = {
      limit: event.rows,
      offset: event.first,
      sort: event.sortField ? `${event.sortField} ${sortDirection}` : '',
    };
    if (event.globalFilter && event.globalFilter.length > 0) {
      payload.q = event.globalFilter;
    }
    this.getRecords(payload);

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
  }
}
