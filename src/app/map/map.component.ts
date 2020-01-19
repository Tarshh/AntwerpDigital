import { Feature } from './../interface/feature';
import { StringService } from './../string.service';
import { MapService } from './../map.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
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
    citiesLayerGroup: any;

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

        this.citiesLayerGroup = L.layerGroup().addTo(this.map);

        tiles.addTo(this.map);
    }

    ngOnInit(): void {
    }

    placeMarkersAndPopups(dogpark: Feature): void {
        let street = this.StringService.formatString(dogpark.attributes.straatnaam);
        let town = this.StringService.formatString(dogpark.attributes.district);
        let popup = `Straatnaam: ${street} <br> District: ${town} <br> Postcode: ${dogpark.attributes.postcode}`
        let marker = L.marker([dogpark.geometry.y, dogpark.geometry.x]).bindPopup(popup);
        this.citiesLayerGroup.addLayer(marker);
        this.citiesLayerGroup.addTo(this.map);
    }

    getSearchedData(city: string): void {
        this.citiesLayerGroup.clearLayers();
        this.mapService.getData().subscribe((response) => {
            response.features.map(feature => {
                if (this.StringService.formatString(feature.attributes.district) === city) {
                    this.placeMarkersAndPopups(feature);
                };
            });
        })
    }
}