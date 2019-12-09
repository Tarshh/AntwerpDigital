import { Attributes } from './attributes';
import { Geometry } from './geometry';

export interface Feature {
    attributes: Attributes;
    geometry: Geometry;
}