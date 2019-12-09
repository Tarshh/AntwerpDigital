import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StringService {

    constructor() { }

    formatString(str: string): string {
        return str
            .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
            .replace(/^[^ ]/g, match => (match.toUpperCase()));
    }
}
