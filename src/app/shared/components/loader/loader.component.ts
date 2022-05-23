import { Component, OnInit } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Scroll} from '@angular/router';
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isPageLoading = false;
  isXHRLoading = false;
  loadText: any;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) =>
      this.checkRouterEvent(event)
    );

    this.loaderService.loaderState.subscribe((loader) => setTimeout(() => { this.isXHRLoading = loader.show; this.loadText = loader.text}));
  }

  isLoading() {
    return this.isPageLoading || this.isXHRLoading;
  }

  checkRouterEvent(routerEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.isPageLoading = true;
    }

    // Handle loader still appearing even after navigation ended https://trufla.atlassian.net/browse/TRUM-4460

    if (routerEvent instanceof Scroll && routerEvent?.routerEvent instanceof NavigationEnd) {
      this.isPageLoading = false;
      this.loaderService.hide();
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.isPageLoading = false;
      const mainHeader = document.querySelector('#header-title-holder');
      if (mainHeader) {
        (mainHeader as HTMLElement).focus();
      }
    }
  }
}
