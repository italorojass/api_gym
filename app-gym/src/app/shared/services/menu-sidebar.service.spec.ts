import { TestBed } from '@angular/core/testing';

import { MenuSidebarService } from './menu-sidebar.service';

describe('MenuSidebarService', () => {
  let service: MenuSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
