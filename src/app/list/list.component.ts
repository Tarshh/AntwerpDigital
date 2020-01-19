import { Attributes } from './../interface/attributes';
import { MapService } from './../map.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    parkList: Attributes[] = [];
    columnList: String[];

    constructor(private mapService: MapService) {
    }

    async ngOnInit() {
        this.getParks();
        this.columnList = ["District", "Naam", "Straatnaam", "Verlichting?"];
    }

    getParks(): void {
        this.mapService.getData().subscribe((response) => {
            response.features.forEach(item => {
                this.parkList.push(item.attributes);
            });
        });
    }
}