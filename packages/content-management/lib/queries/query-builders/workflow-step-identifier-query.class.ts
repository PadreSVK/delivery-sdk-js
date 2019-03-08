import { IContentManagementClientConfig } from '../../config';
import { Identifiers } from '../../models';
import { ContentManagementQueryService } from '../../services';

export class WorkflowStepIdentifierQuery<TResult> {

    constructor(
        protected config: IContentManagementClientConfig,
        protected queryService: ContentManagementQueryService,
        protected buildResult: (
            config: IContentManagementClientConfig,
            queryService: ContentManagementQueryService,
            identifier: Identifiers.WorkflowIdentifier) => TResult
    ) {
    }

    /**
    * Id identifier
    * @param id If of the workflow step
    */
    byWorkflowStepId(id: string): TResult {
        return this.buildResult(this.config, this.queryService, new Identifiers.WorkflowIdentifier(Identifiers.WorkflowIdentifierEnum.Id, id));
    }

}
