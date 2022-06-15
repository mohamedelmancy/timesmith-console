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
import {BreadcrumbService} from "ng5-breadcrumb";

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
  isMobile = false;
  isFullscreen = false;
  header: string;
  dark: boolean;
  compactSidebar: boolean;
  isMobileStatus: boolean;
  clientLogo = environment.headerLogo
  language: string = GetLanguage();
  url: string;
  windowSize: number;
  private _routerEventsSubscription: Subscription;
  private _router: Subscription;
  mainLogo = environment.mainLogo;
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
  @ViewChild('horizontalSideNav', {static: true}) horizontalSideNav;

  constructor(public menuItems: MenuItems,
              private pageTitleService: PageTitleService,
              public translate: TranslateService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private authService: AuthService,
              public coreService: CoreService,
              private routes: Router,
              private activatedRoute: ActivatedRoute) {
    if (window.innerWidth > 1199) {
      // this.tourService.start();
    }
         this.setBreadCrumbs();
  }

  ngOnInit() {
    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.horizontalSideNav.close();
      }
    });
    // this.authService.getLocalStorageUser();
    // this.setUserInfo();
    // this.getCurrentUserName();
    this.setLocalization();
    this.pageTitleService.title.subscribe((val: string) => {
      this.header = val;
      secureStorage.setItem('title', val)
    });
  }

  setBreadCrumbs() {
    this.breadcrumbService.addFriendlyNameForRoute('/timeline', 'Today');
    this.breadcrumbService.addFriendlyNameForRoute('/auth/login', 'Login');
    this.breadcrumbService.addFriendlyNameForRoute('/auth/register', 'Register');
    this.breadcrumbService.addFriendlyNameForRoute('/auth/forgot-password', 'Forgot Password');
    this.breadcrumbService.addFriendlyNameForRoute('/requests', 'Requests');
    this.breadcrumbService.addFriendlyNameForRoute('/reports', 'Reports');
    this.breadcrumbService.addFriendlyNameForRoute('/notifications', 'Notifications');
    this.breadcrumbService.addFriendlyNameForRoute('/configurations', 'Configurations');
    this.breadcrumbService.addFriendlyNameForRoute('/team', 'Team');
    this.breadcrumbService.addFriendlyNameForRoute('/roles-permissions', 'Roles & permissions');
    this.breadcrumbService.addFriendlyNameForRoute('/support', 'Support');
  }

  setLocalization() {
    this.language = GetLanguage();
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
    return this.authService.getLocalStorageUser();
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
   * toggleSidebar method is used a toggle a side nav bar.
   */

  toggleSidebar() {
    this.coreService.horizontalSideNavOpen = !this.coreService.horizontalSideNavOpen;
  }

  /**
   * logOut method is used to log out the  template.
   */
  logOut() {
    this.authService.logOut();
  }

  // onResize method is used to set the side bar according to window width.
  onResize(event) {
    if (event.target.innerWidth < 1200) {
      this.coreService.horizontalSideNavMode = 'over';
      this.coreService.horizontalSideNavOpen = false;
      var main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (!(main_div[i].classList.contains('sidebar-overlay'))) {
          if (document.getElementById('main-app')) {
            document.getElementById('main-app').className += " sidebar-overlay";
          }
        }
      }
    } else {
      //for responsive
      var main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (main_div[i].classList.contains('sidebar-overlay')) {
          document.getElementById('main-app').classList.remove('sidebar-overlay');
        }
      }
    }
  }
}
