import { MapService } from './../map.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    citiesList: string[] = [];
    uniqueCityList: Set<string> = new Set();
    @Output() change = new EventEmitter();
    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.citiesList = this.mapService.getCities();
    }

    onChange(city: string) {
        this.mapService.setSearchValue(city);
    }
}
