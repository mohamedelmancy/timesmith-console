import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import GeoSearchControl from 'leaflet-geosearch/lib/SearchControl';
import OpenStreetMapProvider from 'leaflet-geosearch/lib/providers/openStreetMapProvider';

declare var require: any;
var L = require('leaflet')
// import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import 'leaflet.locatecontrol'
import {TranslateService} from "@ngx-translate/core";


const provider = new OpenStreetMapProvider();

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private coreService: CoreService,
              private translateService: TranslateService) {
  }

  lat = 30.0444;
  lng = 31.2357;
  map;
  data;
  marker;
  circle;
  defaultIcon = new L.Icon.Default();
  customIcon = L.icon({
    iconUrl: '../../../../../assets/img/map/marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -60],
    shadowUrl: '../../../../../assets/img/map/marker-shadow.png'
  });

  ngOnInit(): void {
    this.form = this.fb.group({
        name_en: ['', Validators.compose([Validators.required])],
        name_ar: ['', Validators.compose([Validators.required])],
        latitude: ['', Validators.compose([Validators.required])],
        longitude: [null, Validators.compose([Validators.required])],
        tolerance: [null, Validators.compose([Validators.required])],
        // individuals: [null, Validators.compose([Validators.required])],
      },
      {validators: []}
    );
    setTimeout(() => {
      this.map = L.map('map', {
        center: [this.lat, this.lng],
        zoom: 12,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      const _this = this;
      this.map.on('click', function (e) {
        console.log('eee', e);
        _this.fillMapFields(e);
      });
      L.control.locate().addTo(this.map);
      this.addSearchBox();
      this.initialize();
      this.map?.on('locationfound', function (ev) {
        console.log('locationfound', ev);
        _this.onLocationFound(ev);
      })
      // this.gotoCurrent();
    }, 2000);
  }

  onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng, {icon: this.customIcon}).addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();
    this.addCircle(e);
  }

  addCircle(e) {
    var radius = (e.accuracy / 2) || (this.form.value.tolerance) || 30;
    if (!this.circle) {
      this.circle = L.circle(e.latlng, radius).addTo(this.map);
    } else {
      this.circle.setLatLng(e.latlng)
    }
  }

  ngAfterViewInit() {
  }

  fillMapFields(e) {
    this.form.controls['latitude'].setValue(e.latlng?.lat);
    this.form.controls['longitude'].setValue(e.latlng?.lng);
    this.addMarker(e);
  }

  initialize() {
    this.data = this.activatedRoute.snapshot.data['site'];
    this.data = secureStorage.getItem('row');
    console.log('this.data', this.data);
    this.form.valueChanges.subscribe(changes => {
      if (changes.latitude && changes?.longitude) {
        console.log('changes', changes);
        this.map?.panTo(new L.LatLng(changes?.latitude, changes?.longitude));
        this.addMarker({latlng: {lat: changes.latitude, lng: changes.longitude}});
        // this.addCircle({latlng: {lat: changes.latitude, lng: changes.longitude}}, this.form.value.tolerance || 15);
      }
    });
    this.fillForm();
  }

  addMarker(ev) {
    var radius = this.form.value.tolerance || 30;
    if (!this.marker) {
      this.marker = L.marker([ev.latlng.lat, ev.latlng.lng], {
        icon: this.customIcon,
        draggable: true,
        id: Math.random()
      }).addTo(this.map)
        .bindPopup("You are within " + radius + " meters from this point").closePopup();
    } else {
      this.marker.setLatLng(ev.latlng)
    }
    this.addCircle(ev);
  }

  gotoCurrent() {
    // const locate = this.map.locate({setView: true, maxZoom: 12});
    // console.log('locate', locate)

    const _this = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('position', position)
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      _this.fillMapFields({latlng: {lat, lng}})
    })
  }

  fillForm() {
    this.form.controls['name_ar'].setValue(this.data?.name_ar);
    this.form.controls['name_en'].setValue(this.data?.name_en);
    this.form.controls['latitude'].setValue(this.data?.latitude);
    this.form.controls['longitude'].setValue(this.data?.longitude);
    this.form.controls['tolerance'].setValue(this.data?.tolerance);
    // this.form.controls['individuals'].setValue(this.data?.individuals);
  }

  async addSearchBox() {
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
        icon: this.customIcon,
        draggable: true,
      },
      popupFormat: ({query, result}) => {
        return result.label
      }, // optional: function    - default returns result label,
      resultFormat: ({result}) => {
        // console.log('result.label', result.label);
        return result.label;
      }, // optional: function    - default returns result label
      maxMarkers: 1, // optional: number      - default 1
      retainZoomLevel: true, // optional: true|false  - default false
      animateZoom: true, // optional: true|false  - default true
      autoClose: false, // optional: true|false  - default false
      searchLabel: this.translateService.instant('Enter address...'), // optional: string      - default 'Enter address'
      keepResult: true, // optional: true|false  - default false
      updateMap: true, // optional: true|false  - default true
    }).addTo(this.map);
  }

  mapClicked(event) {
  }

  save(value) {

  }

}
