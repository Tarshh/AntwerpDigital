import { debug } from 'util';
import { Feature } from './interface/feature';
import { StringService } from './string.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RootObject } from './interface/root';


@Injectable({
    providedIn: 'root'
})
export class MapService {
    url: string = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek1/MapServer/9/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    cities: string[] = [];
    searchValue: string;
    filteredFeatures: Feature[] = [];
    constructor(private http: HttpClient) { }

    getData(): Observable<RootObject> {
        return this.http.get<RootObject>(this.url);
    }

    setSearchValue(value: string): void {
        this.searchValue = value.toLocaleUpperCase();
    }
}