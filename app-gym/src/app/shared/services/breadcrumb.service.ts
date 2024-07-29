import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.buildBreadcrumbs(this.router.routerState.root);
        this.breadcrumbs.next(breadcrumbs);
      });
  }

  private buildBreadcrumbs(route: any, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: any[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment: any) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      if(child.snapshot.data['breadcrumb']){
        const breadcrumb = {
          label: child.snapshot.data['breadcrumb'],
          url: url
        };

        breadcrumbs.push(breadcrumb);
      }


      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }


}
