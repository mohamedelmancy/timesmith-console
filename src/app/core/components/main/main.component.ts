import {filter} from 'rxjs/operators';
import {Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {GetCurrentUser, GetLanguage} from "../../../shared/functions/shared-functions";
import {MenuItems} from "../../menu/menu-items/menu-items";
import {PageTitleService} from "../../page-title/page-title.service";
import {AuthService} from "../../../services/auth.service";
import {CoreService} from "../../../services/core.service";
import {secureStorage} from "../../../shared/functions/secure-storage";
import {environment} from "../../../../environments/environment";

declare var require;

const screenfull = require('screenfull');

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class MainComponent implements OnInit, OnDestroy {

  userName: string;
  isLoggedIn = true;
  root: any = 'rtl';
  layout: any = 'rtl';
  customizerIn = false;
  sidenavOpen = true;
  isMobile = false;
  isFullscreen = false;
  collapseSidebarStatus: boolean;
  header: string;
  dark: boolean;
  compactSidebar: boolean;
  isMobileStatus: boolean;
  sidenavMode = 'side';
  language: string = GetLanguage();
  popupDeleteResponse: any;
  sidebarColor: any;
  url: string;
  windowSize: number;
  private _routerEventsSubscription: Subscription;
  private _router: Subscription;
  mainLogo = environment.mainLogo;
  dailyOps;
  @ViewChild('sidenav', {static: true}) sidenav;

  sideBarFilterClass: any = [
    {
      sideBarSelect: 'sidebar-color-1',
      colorSelect: 'sidebar-color-dark'
    },
    {
      sideBarSelect: 'sidebar-color-2',
      colorSelect: 'sidebar-color-primary',
    },
    {
      sideBarSelect: 'sidebar-color-3',
      colorSelect: 'sidebar-color-accent'
    },
    {
      sideBarSelect: 'sidebar-color-4',
      colorSelect: 'sidebar-color-warn'
    },
    {
      sideBarSelect: 'sidebar-color-5',
      colorSelect: 'sidebar-color-green'
    }
  ]

  headerFilterClass: any = [
    {
      headerSelect: 'header-color-1',
      colorSelect: 'header-color-dark'
    },
    {
      headerSelect: 'header-color-2',
      colorSelect: 'header-color-primary'
    },
    {
      headerSelect: 'header-color-3',
      colorSelect: 'header-color-accent'
    },
    {
      headerSelect: 'header-color-4',
      colorSelect: 'header-color-warning'
    },
    {
      headerSelect: 'header-color-5',
      colorSelect: 'header-color-green'
    }
  ]

  constructor(public menuItems: MenuItems,
              private pageTitleService: PageTitleService,
              public translate: TranslateService,
              private router: Router,
              private authService: AuthService,
              public coreService: CoreService,
              private routes: Router,
              private activatedRoute: ActivatedRoute) {
    if (window.innerWidth > 1199) {
      // this.tourService.start();
    }

  }

  ngOnInit() {
    // this.authService.getLocalStorageUser();
    // this.setUserInfo();
    // this.getCurrentUserName();
    this.setLocalization();

    this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
    this.pageTitleService.title.subscribe((val: string) => {
      this.header = val;
      secureStorage.setItem('title', val)
    });

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
      this.url = event.url;
      this.customizeSidebar();
    });
    this.url = this.router.url;
    this.customizeSidebar();

    setTimeout(() => {
      this.windowSize = window.innerWidth;
      this.resizeSideBar();
    }, 0)


    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        // this.sidenav.close();
      }
    });
  }

  setLocalization() {
    this.language =  GetLanguage();
    this.translate.use(this.language);
    const dir = this.language === 'ar' ? 'rtl' : 'ltr';
    document.body.style.direction = dir;
    if (this.language === 'ar' || !this.language) {
      this.layout = 'rtl';
    } else {
      this.layout = 'ltr';
    }
  }

  getCurrentUserName() {
    this.authService.loggedIn.subscribe(value => {
      if (value) {
        this.setUserInfo();
      } else {
        this.userName = '';
        this.isLoggedIn = false;
      }
    }, err => {

    })
  }

  setUserInfo() {
    const userInfo = GetCurrentUser();
    if (userInfo?.firstName) {
      this.userName = userInfo?.firstName?.trim() + ' ' + userInfo?.socondName?.trim();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  checkAuthority() {
    return  this.authService.getLocalStorageUser();
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  /**
   *As router outlet will emit an activate event any time a new component is being instantiated.
   */
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  /**
   * toggleFullscreen method is used to show a template in fullscreen.
   */
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  /**
   * customizerFunction is used to open and close the customizer.
   */
  customizerFunction() {
    this.customizerIn = !this.customizerIn;
  }

  /**
   * addClassOnBody method is used to add a add or remove class on body.
   */
  addClassOnBody(event) {
    this.dark = !this.dark;
    const body = document.body;
    if (event.checked) {
      body.classList.add('dark-theme-active');
    } else {
      body.classList.remove('dark-theme-active');
    }
  }

  /**
   * changeRTL method is used to change the layout of template.
   */
  changeRTL(lang) {
    if (lang === 'ar') {
      this.layout = 'rtl'
      secureStorage.setItem('lang', 'ar');
      this.translate.use('ar');
      this.language = 'ar';
    } else {
      this.layout = 'ltr'
      secureStorage.setItem('lang', 'en');
      this.translate.use('en');
      this.language = 'en';
    }
    // ReloadCurrentComponent(this.router);
    window.location.reload();
    this.customizerIn = !this.customizerIn;
  }

  /**
   * toggleSidebar method is used a toggle a side nav bar.
   */
  toggleSidebar() {
    this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
  }

  /**
   * logOut method is used to log out the  template.
   */
  logOut() {
    this.authService.logOut();
  }

  /**
   * onDelete function is used to open the delete dialog.
   */
  onDelete(cart) {
    // this.ecommerceService.deleteDialog('Are you sure you want to delete this product permanently?')
    //     .subscribe(res => {
    //             this.popupDeleteResponse = res
    //         },
    //         err => console.log(err),
    //         () => this.getPopupDeleteResponse(this.popupDeleteResponse, cart)
    //     );
  }

  /**
   * getPopupDeleteResponse is used to delete the cart item when reponse is yes.
   */
  getPopupDeleteResponse(response: any, cart) {
    // if (response == 'yes') {
    //     this.ecommerceService.localStorageDelete(cart, 'cartProduct');
    // }
  }

  /**
   * sidebarFilter function filter the color for sidebar section.
   */
  sidebarFilter(selectedFilter) {
    for (let i = 0; i < this.sideBarFilterClass.length; i++) {
      document.getElementById('main-app')!.classList.remove(this.sideBarFilterClass[i].colorSelect);
      if (this.sideBarFilterClass[i].colorSelect == selectedFilter.colorSelect) {
        document.getElementById('main-app')!.classList.add(this.sideBarFilterClass[i].colorSelect);
      }
    }
    document.querySelector('.radius-circle')!.classList.remove('radius-circle');
    document.getElementById(selectedFilter.sideBarSelect)!.classList.add('radius-circle');
  }

  /**
   * headerFilter function filter the color for header section.
   */
  headerFilter(selectedFilter) {
    for (let i = 0; i < this.headerFilterClass.length; i++) {
      document.getElementById('main-app')!.classList.remove(this.headerFilterClass[i].colorSelect);
      if (this.headerFilterClass[i].colorSelect == selectedFilter.colorSelect) {
        document.getElementById('main-app')!.classList.add(this.headerFilterClass[i].colorSelect);
      }
    }
    document.querySelector('.radius-active')!.classList.remove('radius-active');
    document.getElementById(selectedFilter.headerSelect)!.classList.add('radius-active');
  }

  /**
   *chatMenu method is used to toggle a chat menu list.
   */
  chatMenu() {
    document.getElementById('gene-chat')!.classList.toggle('show-chat-list');
  }

  /**
   * onChatOpen method is used to open a chat window.
   */
  onChatOpen() {
    document.getElementById('chat-open')!.classList.toggle('show-chat-window');
  }

  /**
   * onChatWindowClose method is used to close the chat window.
   */
  chatWindowClose() {
    document.getElementById('chat-open')!.classList.remove('show-chat-window');
  }

  collapseSidebar(event) {
    if (event.checked) {
      this.coreService.collapseSidebar = true;
    } else {
      this.coreService.collapseSidebar = false;
    }
  }

  // onResize method is used to set the side bar according to window width.
  onResize(event) {
    this.windowSize = event.target.innerWidth;
    this.resizeSideBar();
  }

  // customizeSidebar method is used to change the side bar behaviour.
  customizeSidebar() {
    // if ((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize < 1920) {
    //   this.coreService.sidenavMode = 'over';
    //   this.coreService.sidenavOpen = false;
    //   if (!(document.getElementById('main-app')!.classList.contains('sidebar-overlay'))) {
    //     document.getElementById('main-app')!.className += ' sidebar-overlay';
    //   }
    //
    // } else if ((window.innerWidth > 1200) && (this.url == '/dashboard/crypto' || this.url == '/crypto/marketcap' || this.url == '/crypto/wallet' || this.url == '/crypto/trade')) {
    //   this.collapseSidebarStatus = this.coreService.collapseSidebar;
    //   if ((this.collapseSidebarStatus == false) && (window.innerWidth > 1200)) {
    //     document.getElementById('main-app')!.className += ' collapsed-sidebar';
    //     this.coreService.collapseSidebar = true;
    //     this.coreService.sidenavOpen = true;
    //     this.coreService.sidenavMode = 'side';
    //     document.getElementById('main-app')!.classList.remove('sidebar-overlay');
    //   }
    // } else if ((window.innerWidth > 1200) && !(this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice')) {
    //   this.coreService.sidenavMode = 'side';
    //   this.coreService.sidenavOpen = true;
    //   // for responsive
    //   const main_div = document.getElementsByClassName('app');
    //   for (let i = 0; i < main_div.length; i++) {
    //     if (main_div[i].classList.contains('sidebar-overlay')) {
    //       document.getElementById('main-app')!.classList.remove('sidebar-overlay');
    //     }
    //   }
    // } else if (window.innerWidth < 1200) {
    //   this.coreService.sidenavMode = 'over';
    //   this.coreService.sidenavOpen = false;
    //   const main_div = document.getElementsByClassName('app');
    //   for (let i = 0; i < main_div.length; i++) {
    //     if (!(main_div[i].classList.contains('sidebar-overlay'))) {
    //       document.getElementById('main-app')!.className += ' sidebar-overlay';
    //     }
    //   }
    // }
  }

  // To resize the side bar according to window width.
  resizeSideBar() {
    if (this.windowSize < 1200) {
      this.isMobileStatus = true;
      this.isMobile = this.isMobileStatus;
      this.coreService.sidenavMode = 'over';
      this.coreService.sidenavOpen = false;
      // for responsive
      const main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (!(main_div[i].classList.contains('sidebar-overlay'))) {
          if (document.getElementById('main-app')) {
            document.getElementById('main-app')!.className += ' sidebar-overlay';
          }
        }
      }
    } else if ((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize < 1920) {
      this.customizeSidebar();
    } else {
      this.isMobileStatus = false;
      this.isMobile = this.isMobileStatus;
      this.coreService.sidenavMode = 'side';
      this.coreService.sidenavOpen = true;
      // for responsive
      const main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (main_div[i].classList.contains('sidebar-overlay')) {
          document.getElementById('main-app')!.classList.remove('sidebar-overlay');
        }
      }
    }
  }
}
