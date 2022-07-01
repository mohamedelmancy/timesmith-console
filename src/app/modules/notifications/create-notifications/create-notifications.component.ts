import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['./create-notifications.component.scss']
})
export class CreateNotificationsComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private translateService: TranslateService, private coreService: CoreService) {
  }
  dropdownSettings = {};
  placeholderText: string = this.translateService.instant('Select');
  selectAllText: string = this.translateService.instant('Select all');
  unSelectAllText: string = this.translateService.instant('Unselect all');
  searchText: string = this.translateService.instant('type name...');
  disabled = false;
  noDataAvailText: string = this.translateService.instant('No data available');
  recipients = [];
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
    },{
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
    this.setNewAutoSetting();
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

  setNewAutoSetting() {
    this.dropdownSettings = {
      'singleSelection': false,
      'defaultOpen': false,
      'idField': 'id',
      'textField': 'name',
      'selectAllText': this.selectAllText,
      'unSelectAllText': this.unSelectAllText,
      'searchPlaceholderText': this.searchText,
      'noDataAvailablePlaceholderText': this.noDataAvailText,
      'enableCheckAll': true,
      'itemsShowLimit': 'All',
      'allowSearchFilter': true
    };
  }


  onSelectImage(event) {
    event.preventDefault();
    // this.removeAvatar();
    if (event.target.files[0]) {
      for (let type of this.acceptedAvatarFileTypes) {
        if (event.target.files[0].type === type) {                        // check if file type is acceptable
          if (event.target.files[0].size <= 2097152) {                    // check if file size is acceptable
            this.imageFile = event.target.files[0];                      // update file variable
            this.imageSrc = void 0;                                      // clear current previewed image src
            const reader = new FileReader();                              // a built-in object to let the application read the contents of an avatarFile
            const _this = this;                                 // add a reference to the component to be called inside the reader functions
            reader.addEventListener('load', function () {   // update previewed image source on reader reload
              _this.imageSrc = reader.result;
            }, false);
            reader.readAsDataURL(this.imageFile);                        // reload reader with a new file
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
    this.imageFile = void 0;                      // clear locally uploaded file
    this.imageSrc= void 0;                       // clear previewed image source
  }

  save(value) {

  }


}
