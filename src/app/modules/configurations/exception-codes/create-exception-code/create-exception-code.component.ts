import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";

@Component({
  selector: 'app-create-exception-code',
  templateUrl: './create-exception-code.component.html',
  styleUrls: ['./create-exception-code.component.scss']
})
export class CreateExceptionCodeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) {
  }
  data;
  fallbackIcon = 'fas fa-user';
  ngOnInit(): void {
    this.form = this.fb.group({
        code: ['', Validators.compose([Validators.required])],
        symbol: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
    this.data = this.activatedRoute.snapshot.data['leave'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    console.log('this.data', this.data);
  }

  onIconPickerSelect(icon: string): void {
    // this.iconCss.setValue(icon);
    console.log('icon', icon)
    this.form.controls['symbol'].setValue(icon);
  }

  fillForm() {
    this.form.controls['code'].setValue(this.data?.name);
    this.form.controls['symbol'].setValue(this.data?.symbol);
  }

  save(value) {

  }

}
