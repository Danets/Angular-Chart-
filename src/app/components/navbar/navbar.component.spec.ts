import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NavbarComponent } from './navbar.component';

import { DataService } from "../../data.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dataService: DataService;
  let debugElement: DebugElement;
  let dataSpy;
  let resetSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    dataService = debugElement.injector.get(DataService);
    dataSpy = spyOn(dataService, 'selectControl');
    resetSpy = spyOn(dataService, 'resetFilters');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectControl in the dataService', () => {
    const control = 'control';
    component.changeOption(control);
    expect(dataSpy).toHaveBeenCalledWith(control)
  });

  it('should call resetFilters in the dataService', () => {
    component.resetAll();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should call onChange in the NavbarComponent', () => {
    const files = [];
    component.onChange(files);
  });

});
