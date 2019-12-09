import { debug } from 'util';
import { Feature } from './../interface/feature';
import { StringService } from './../string.service';
import { MapService } from './../map.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { RootObject } from '../interface/root';
import { Geometry } from '../interface/geometry';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: MapComponent;
    geometry: Geometry;
    searchedFeatures: Feature[];

    constructor(private mapService: MapService, private StringService: StringService) { }

    ngAfterViewInit(): void {
        this.initMap();
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: L.latLng(51.220104, 4.401309),
            zoom: 12,
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });
        tiles.addTo(this.map);
    }

    ngOnInit(): void {
        // this.getData();
    }

    // getData(): void {
    //     this.mapService.getJsonData().subscribe({
    //         next: (result) => {
    //             let root: RootObject = result;
    //             root.features.forEach(element => {
    //                 this.placeMarkersAndPopups(element);
    //             });
    //         }
    //     })
    // }

    placeMarkersAndPopups(dogpark: Feature): void {
        let street = this.StringService.formatString(dogpark.attributes.straatnaam);
        let town = this.StringService.formatString(dogpark.attributes.district);
        let popup = `Straatnaam: ${street} <br> Gemeente: ${town} <br> Postcode: ${dogpark.attributes.postcode}`
        L.marker([dogpark.geometry.y, dogpark.geometry.x]).bindPopup(popup).addTo(this.map);
    }

    getSearchedData(): void {
        this.mapService.getSearchValue()
            .then(response => {
                response.forEach(element => {
                    console.log(element);
                    this.placeMarkersAndPopups(element);
                });
            })
    }
}