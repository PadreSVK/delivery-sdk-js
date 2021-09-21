import { IHeader, IHttpService, IRetryStrategyOptions } from '@kentico/kontent-core';

import { ElementResolver } from '../elements';
import { ElementCollisionResolver, IProxyUrlData, IQueryConfig, PropertyNameResolver } from '../models';
import { IRichTextHtmlParser } from '../parser';

export interface IDeliveryClientProxyConfig {
    /**
     * Base url used for preview reqeusts. Defaults to 'preview-deliver.kontent.ai'
     */
    basePreviewUrl?: string;

    /**
     * Can be used to generate custom request urls.
     * Useful when you have a proxy server and need to transform url to a specific format
     * and setting 'baseUrl' is not sufficient.
     */
    advancedProxyUrlResolver?: (data: IProxyUrlData) => string;

    /**
    * Base url used for all requests. Defaults to 'deliver.kontent.ai'
    */
    baseUrl?: string;
}

export interface IDeliveryClientConfig {

    /**
     * ProjectId of your Kentico Kontent project
     */
    projectId: string;

    /**
     * Resolver used to rename content item elements. Can be used to e.g. transform underscored element codenames to camelCase format
     */
    propertyNameResolver?: PropertyNameResolver;

    /**
    * Preview API key
    */
    previewApiKey?: string;

    /**
    * Secure API key
    * Important: Use secured API only when running on Node.JS server, otherwise
    * your key will be visible in browsers when making requests.
    */
    secureApiKey?: string;

    /**
     * Resolver used for using custom models for custom elements.
     */
    elementResolver?: ElementResolver;

    /**
     * Proxy configuration
     */
    proxy?: IDeliveryClientProxyConfig;

    /**
     * Default language of content items
     */
    defaultLanguage?: string;

    /**
     * Retry policy configuration
     */
    retryStrategy?: IRetryStrategyOptions;

    /**
     * Can be used to inject custom Http service to perform requests
     */
    httpService?: IHttpService<any>;

    /**
     * Global settings for linked item resolver
     */
    linkedItemResolver?: {
        /**
         * Element used for wrapping resolved linked item
         */
        linkedItemWrapperTag?: string,
        /**
         * CSS classes applied to wrapper
         */
        linkedItemWrapperClasses?: string[]
    };

    /**
     * Extra headers added to each http request
     */
    globalHeaders?: (queryConfig: IQueryConfig) => IHeader[];

    /**
     * Resolver used when content item properties would overlap. Collision resolver can be used to change property name to avoid conflicts.
     */
    collisionResolver?: ElementCollisionResolver;

    /**
     * Array of status codes that should be retried when request fails. Defaults [500].
     */
    retryStatusCodes?: number[];

    /**
     * Default query configuration. Can be overriden by individual queries.
     */
    globalQueryConfig?: IQueryConfig;

    /**
     * Rich text parser adapter. When not set, default afapter for either browse or node.js is used
     */
    richTextParserAdapter?: IRichTextHtmlParser;

}

