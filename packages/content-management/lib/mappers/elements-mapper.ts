import { ContentItemElements, ContentItemModels } from '../models';
import { BaseMapper } from './base-mapper';

export class ElementsMapper extends BaseMapper {

    mapElements<TElements extends ContentItemModels.ContentItemVariantElements>(rawElementsJson: any, fieldDefinitions: ContentItemElements.IContentItemElementDefinition[], model: TElements): TElements {
        for (const fieldDefinition of fieldDefinitions) {
            // set property of model based on json value and field configuration
            model[this.getPropertyName(fieldDefinition)] = this.mapElement(rawElementsJson, fieldDefinition);
        }

        return model;
    }

    private mapElement(rawElementsJson: any, fieldDefinition: ContentItemElements.IContentItemElementDefinition):
        ContentItemElements.TextElement |
        ContentItemElements.DateElement {
        // get the value from json
        const fieldValue = rawElementsJson[fieldDefinition.name];
        if (!fieldValue) {
            throw Error(`Could not map field '${fieldDefinition.name}' in JSON source`);
        }

        if (fieldDefinition.type === ContentItemElements.ContentElementTypeEnum.text) {
            return this.mapTextElement(fieldValue);
        }
        if (fieldDefinition.type === ContentItemElements.ContentElementTypeEnum.date) {
            return this.mapDateElement(fieldValue);
        }

        throw Error(`Unsupported type '${fieldDefinition.type}' for field '${fieldDefinition.name}'`);
    }

    private getPropertyName(fieldDefinition: ContentItemElements.IContentItemElementDefinition): string {
        if (fieldDefinition.propertyName) {
            return fieldDefinition.propertyName;
        }
        return fieldDefinition.name;
    }

    private mapTextElement(fieldValue: any): ContentItemElements.TextElement {
        return new ContentItemElements.TextElement(fieldValue);
    }

    private mapDateElement(fieldValue: any): ContentItemElements.DateElement {
        return new ContentItemElements.DateElement(fieldValue ? new Date(fieldValue) : undefined);
    }

}

export const elementsMapper = new ElementsMapper();
