import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var require: any;
var L  = require('leaflet')
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) { }
  lat = 51.678418;
  lng = 7.809007;
  map;
  data;
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        latitude: ['', Validators.compose([Validators.required])],
        longitude: [null, Validators.compose([Validators.required])],
        tolerance: [null, Validators.compose([Validators.required])],
        individuals: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    setTimeout(() => {
      this.map = L.map('map', {
        center: [30.0444, 31.2357],
        zoom: 13
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      const _this = this;
      this.map.on('click', function (e) {
        console.log('eee', e)
        _this.form.controls['latitude'].setValue(e.latlng?.lat);
        _this.form.controls['longitude'].setValue(e.latlng?.lng);
      });
      this.addSearchBox();
    }, 2000);

    this.form.valueChanges.subscribe(changes => {
      console.log('changes', changes);
      if (changes.latitude && changes?.longitude) {
        this.map?.panTo(new L.LatLng(changes?.latitude, changes?.longitude));
      }
    });
    this.data = this.activatedRoute.snapshot.data['site'];
    this.data = secureStorage.getItem('row');
    this.fillForm();
    console.log('this.data', this.data);
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    this.form.controls['latitude'].setValue(this.data?.latitude);
    this.form.controls['longitude'].setValue(this.data?.longitude);
    this.form.controls['tolerance'].setValue(this.data?.tolerance);
    this.form.controls['individuals'].setValue(this.data?.individuals);
  }

  async addSearchBox() {
    const provider = new OpenStreetMapProvider();
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoComplete: true, // optional: true|false  - default true
      style: 'bar',
      autoCompleteDelay: 250, // optional: number      - default 250
      showMarker: true, // optional: true|false  - default true
      showPopup: true, // optional: true|false  - default false
      marker: {
        // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default(),
        draggable: false,
      },
      popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
      resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
      maxMarkers: 1, // optional: number      - default 1
      retainZoomLevel: true, // optional: true|false  - default false
      animateZoom: true, // optional: true|false  - default true
      autoClose: false, // optional: true|false  - default false
      searchLabel: 'Enter address', // optional: string      - default 'Enter address'
      keepResult: false, // optional: true|false  - default false
      updateMap: true, // optional: true|false  - default true
    }).addTo(this.map);
  }
  mapClicked(event) {
  }

  save(value) {

  }

}
