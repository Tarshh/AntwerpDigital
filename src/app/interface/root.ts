import { Feature } from './feature';
import { Field } from './field';
import { SpatialReference } from './spatialReference';
import { FieldAliases } from './fieldAliases';

export interface RootObject {
    displayFieldName: string;
    fieldAliases: FieldAliases;
    geometryType: string;
    spatialReference: SpatialReference;
    fields: Field[];
    features: Feature[];
}