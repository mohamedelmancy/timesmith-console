import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var require: any;
var L  = require('leaflet')
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../../../../services/core.service";
import {secureStorage} from "../../../../shared/functions/secure-storage";
import {LatLng} from "leaflet";

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private coreService: CoreService) { }
  lat = 30.0444;
  lng = 31.2357;
  map;
  data;
  marker;
  customIcon = L.icon({
    iconUrl: '../../../../../assets/img/map/marker.svg',
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [0, -60],
    shadowUrl: '../../../../../assets/img/map/marker-shadow.png'
  });
  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
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
        zoom: 12
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      // L.control.locate({ enableHighAccuracy: true }).addTo(this.map);
      const _this = this;
      this.map.on('click', function (e) {
        console.log('eee', e);
        _this.form.controls['latitude'].setValue(e.latlng?.lat);
        _this.form.controls['longitude'].setValue(e.latlng?.lng);
        _this.addMarker(e);
      });
      this.addSearchBox();
      this.initialize();
      this.gotoCurrent();
    }, 2000);
  }

  ngAfterViewInit() {

  }

  initialize() {
    this.data = this.activatedRoute.snapshot.data['site'];
    this.data = secureStorage.getItem('row');
    console.log('this.data', this.data);
    this.form.valueChanges.subscribe(changes => {
      if (changes.latitude && changes?.longitude) {
        // console.log('changes', changes);
        this.map?.panTo(new L.LatLng(changes?.latitude, changes?.longitude));
        this.addMarker({latlng: {lat: changes.latitude, lng: changes.longitude}});
      }
    });
    this.fillForm();
  }

  addMarker(ev) {
    const _this = this;
    var icon = new L.Icon.Default();
    if (!this.marker) {
      console.log('111', ev);
      this.marker = L.marker([ev.latlng.lat, ev.latlng.lng], {icon: this.customIcon, draggable: true, id: Math.random()}).addTo(_this.map);
    } else {
      // this.map.removeLayer(this.marker)
      console.log('2222', ev);
      this.marker.setLatLng(ev.latlng)
    }

  }

  gotoCurrent() {
    const _this = this;
    this.map.on('locationfound', function(ev){
        console.log('locationfound', ev);

    })
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('position', position)
      const latit = position.coords.latitude;
      const longit = position.coords.longitude;
      // this is just a marker placed in that position
      var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(_this.map);
      // move the map to have the location in its center
      _this.map.panTo(new L.LatLng(latit, longit));
    })
  }

  fillForm() {
    this.form.controls['name'].setValue(this.data?.name);
    this.form.controls['latitude'].setValue(this.data?.latitude);
    this.form.controls['longitude'].setValue(this.data?.longitude);
    this.form.controls['tolerance'].setValue(this.data?.tolerance);
    // this.form.controls['individuals'].setValue(this.data?.individuals);
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
        icon: this.customIcon,
        draggable: true,
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
