import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    const first = location.pathname.split('/')[1];
    // if(first == 'horizontal'){
    // 	this.router.navigate(['/horizontal/dashboard/crm']);
    // }else {
    // 	this.router.navigate(['/dashboard/crm']);
    // }
  }

}
