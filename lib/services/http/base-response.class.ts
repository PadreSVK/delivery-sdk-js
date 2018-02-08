import { AjaxResponse } from 'rxjs/Rx';

export class BaseResponse {
    constructor(
        public data: JSON,
        public response: AjaxResponse | any
    ) {
    }
}
