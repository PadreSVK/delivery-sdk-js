import { IContentManagementClientConfig } from '../../config';
import { Identifiers } from '../../models';
import { ContentManagementQueryService } from '../../services';

export class AssetIdentifierQueryClass<TResult> {

    constructor(
        protected config: IContentManagementClientConfig,
        protected queryService: ContentManagementQueryService,
        protected buildResult: (
            config: IContentManagementClientConfig,
            queryService: ContentManagementQueryService,
            identifier: Identifiers.AssetIdentifier) => TResult
    ) {
    }

    /**
    * Gets using internal Id
    * @param id Internal Id of content item
    */
    byInternalId(id: string): TResult {
        return this.buildResult(this.config, this.queryService, new Identifiers.AssetIdentifier(Identifiers.AssetIdentifierEnum.InternalId, id));
    }

    /**
    * Gets query using external Id
    * @param id External Id of content item
    */
    byExternalId(id: string): TResult {
        return this.buildResult(this.config, this.queryService, new Identifiers.AssetIdentifier(Identifiers.AssetIdentifierEnum.ExternalId, id));
    }
}
