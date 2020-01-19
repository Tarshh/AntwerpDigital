import { StringService } from './../string.service';
import { MapService } from './../map.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    citiesList: string[] = [];
    @Output() change = new EventEmitter();
    constructor(private mapService: MapService, private stringService: StringService) { }

    ngOnInit() {
        // this.citiesList = this.mapService.getCities();
        this.mapService.getData().subscribe(response => {
            response.features.forEach(element => {
                this.citiesList.push(this.stringService.formatString(element.attributes.district));
            });
            this.citiesList = _.union(this.citiesList).sort();
        })
    }

    onChange(city: string) {
        this.change.emit(city);
    }
}