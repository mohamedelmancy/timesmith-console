import {CoreService} from "../../../services/core.service";
import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {MenuItems} from "../../menu/menu-items/menu-items";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() menuList: any;
  @Input() verticalMenuStatus: boolean;
  secondaryLogo = environment.secondaryLogo;
  constructor(public translate: TranslateService,
              private router: Router,
              public coreService: CoreService,
              public menuItems: MenuItems) {
  }

  ngOnInit() {
  }

  // render to the crm page
  onClick() {
    console.log('ddd')
    const first = location.pathname.split('/')[1];
    // if(first == 'horizontal'){
    //    this.router.navigate(['/horizontal/dashboard/crm']);
    // }else {
    //    this.router.navigate(['/dashboard/crm']);
    // }
  }
}
