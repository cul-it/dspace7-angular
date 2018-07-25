import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../search-service/search.service';
import { SortDirection, SortOptions } from '../../core/cache/models/sort-options.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PaginatedSearchOptions } from '../paginated-search-options.model';
import { SearchFilterService } from '../search-filters/search-filter/search-filter.service';

@Component({
  selector: 'ds-search-settings',
  styleUrls: ['./search-settings.component.scss'],
  templateUrl: './search-settings.component.html'
})
export class SearchSettingsComponent implements OnInit {

  @Input() searchOptions: PaginatedSearchOptions;
  /**
   * Declare SortDirection enumeration to use it in the template
   */
  public sortDirections = SortDirection;
  /**
   * Number of items per page.
   */
  public pageSize;
  @Input() public pageSizeOptions;

  query: string;
  page: number;
  direction: SortDirection;
  field: string;
  currentParams = {};
  searchOptionPossibilities = [new SortOptions('score', SortDirection.DESC), new SortOptions('dc.title', SortDirection.ASC), new SortOptions('dc.title', SortDirection.DESC)];
  defaults = {
    pagination: {
      id: 'search-results-pagination',
      pageSize: 10
    },
    sort: new SortOptions('score', SortDirection.DESC),
    query: '',
    scope: ''
  };
  constructor(private service: SearchService,
              private route: ActivatedRoute,
              private router: Router,
              private filterService: SearchFilterService) {
  }

  ngOnInit(): void {
    this.filterService.getPaginatedSearchOptions(this.defaults).subscribe((options) => {
      this.direction = options.sort.direction;
      this.field = options.sort.field;
      this.searchOptions = options;
      this.pageSize = options.pagination.pageSize;
      this.pageSizeOptions = options.pagination.pageSizeOptions
    })
  }

  reloadRPP(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pageSize: value,
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate([ '/search' ], navigationExtras);
  }

  reloadOrder(event: Event) {
    const values = (event.target as HTMLInputElement).value.split(',');
    const navigationExtras: NavigationExtras = {
      queryParams: {
        sortDirection: values[1],
        sortField: values[0]
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate([ '/search' ], navigationExtras);
  }
}
