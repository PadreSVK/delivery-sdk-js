import { Observable } from 'rxjs';

import { IContentManagementClientConfig } from '../../config';
import { ContentItemContracts } from '../../contracts';
import { ContentItemResponses } from '../../responses';
import { ContentManagementQueryService } from '../../services';
import { BaseQuery } from '../base-query';

export class AddContentItemQuery extends BaseQuery<ContentItemResponses.AddContentItemResponse> {

  constructor(
    protected config: IContentManagementClientConfig,
    protected queryService: ContentManagementQueryService,
    public data: ContentItemContracts.IAddContentItemPostContract
  ) {
    super(config, queryService);
  }

  toObservable(): Observable<ContentItemResponses.AddContentItemResponse> {
    return this.queryService.addContentItem(this.getUrl(), this.data, this.queryConfig);
  }

  protected getAction(): string {
    return this.actions.contentItemActions.addContentItem();
  }
}

export class AddContentItemQueryInit {
  constructor(
    protected config: IContentManagementClientConfig,
    protected queryService: ContentManagementQueryService,
  ) {
  }

  withData(item: ContentItemContracts.IAddContentItemPostContract): AddContentItemQuery {
    return new AddContentItemQuery(this.config, this.queryService, item);
  }
}
