import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {TranslateService} from "@ngx-translate/core";
import {MultiselectDropdown} from "../../../../assets/js/multiselect-dropdown";

@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['./create-notifications.component.scss']
})
export class CreateNotificationsComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private translateService: TranslateService,
              private coreService: CoreService) {
  }

  recipients = [
    {
      name: 'Marketing',
      id: 1
    },
  ];
  departments = [
    {
      name: 'Marketing',
      id: 1
    },
    {
      name: 'Sales',
      id: 2
    }
  ];
  sites = [
    {
      name: 'Site1',
      id: 1
    },
    {
      name: 'Site2',
      id: 2
    },
    {
      name: 'Abbas Al Akkad',
      id: 3
    },

  ];
  employees = [
    {
      name: 'ahmed',
      id: 1
    },
    {
      name: 'Ali',
      id: 2
    },
    {
      name: 'Ola',
      id: 3
    }, {
      name: 'Sama',
      id: 4
    },
  ]
  modes = ['sites', 'departments', 'employees'];
  acceptedAvatarFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/svg'
  ];
  imageSrc: any;
  imageFile;

  ngOnInit(): void {
    MultiselectDropdown({});
    this.form = this.fb.group({
        title: ['', Validators.compose([Validators.required])],
        body: ['', Validators.compose([Validators.required])],
        url: ['', Validators.compose([])],
        image: [null, Validators.compose([])],
        mode: [null, Validators.compose([Validators.required])],
        recipients: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
    });
  }

  changeMode(e) {
    console.log('e', e);
    this.form.controls['recipients'].reset();
    if (e === 'sites') {
      this.recipients = this.sites;
    } else if (e === 'departments') {
      this.recipients = this.departments;
    } else if (e === 'employees') {
      this.recipients = this.employees;
    }
    console.log('recipients', this.recipients);
  }

  onSelectImage(event) {
    event.preventDefault();
    // this.removeAvatar();
    if (event.target.files[0]) {
      for (let type of this.acceptedAvatarFileTypes) {
        if (event.target.files[0].type === type) {
          if (event.target.files[0].size <= 2097152) {
            this.imageFile = event.target.files[0];
            this.imageSrc = void 0;
            const reader = new FileReader();
            const _this = this;
            reader.addEventListener('load', function () {
              _this.imageSrc = reader.result;
            }, false);
            reader.readAsDataURL(this.imageFile);
            // this.avatarRequirementsError = void 0;
            return;
          } else {
            this.form?.controls['image'].setErrors({invalidFile: true})
          }
        }
      }
    }
  }

  removeImage() {
    this.imageFile = void 0;
    this.imageSrc = void 0;
  }

  save(value) {

  }


}
