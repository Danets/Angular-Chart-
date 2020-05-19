import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let dataSpy;
  let controlSpy;
  let filtersSpy;
  let filtersLineSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setData should emit data as array', () => {
    dataSpy = spyOn(service.dataSubject, 'next');
    const dataChart = [];
    service.setData(dataChart);
    expect(dataSpy).toHaveBeenCalledWith(dataChart);
  });

  it('selectControl should emit control as string', () => {
    controlSpy = spyOn(service.selectedSubject, 'next');
    const control = 'control';
    service.selectControl(control);
    expect(controlSpy).toHaveBeenCalledWith(control);
  });

  it('setFilters should emit filters for PieChart as array', () => {
    filtersSpy = spyOn(service.filtersSubject, 'next');
    const filters = [];
    service.setFilters(filters);
    expect(filtersSpy).toHaveBeenCalledWith(filters);
  });

  it('setDateRange should emit filters for LineChart as array', () => {
    filtersLineSpy = spyOn(service.dateRangeSubject, 'next');
    const dateRange = [];
    service.setDateRange(dateRange);
    expect(filtersLineSpy).toHaveBeenCalledWith(dateRange);
  });

  
});
