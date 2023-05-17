import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetLogStreams200ResponseInner,
  PatchLogStreamsByIdRequest,
  PostLogStreamsRequest,
  DeleteLogStreamsByIdRequest,
  GetLogStreamsByIdRequest,
  PatchLogStreamsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class LogStreamsManager extends BaseAPI {
  /**
   * Delete a log stream.
   *
   * Delete log stream
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteLogStreamsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/log-streams/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details on <a href="https://auth0.com/docs/logs/streams">log streams</a>.
   * <h5>Sample Response</h5><pre><code>[{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "eventbridge",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"awsAccountId": "string",
   * 		"awsRegion": "string",
   * 		"awsPartnerEventSource": "string"
   * 	}
   * }, {
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "http",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"httpContentFormat": "JSONLINES|JSONARRAY",
   * 		"httpContentType": "string",
   * 		"httpEndpoint": "string",
   * 		"httpAuthorization": "string"
   * 	}
   * },
   * {
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "eventgrid",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"azureSubscriptionId": "string",
   * 		"azureResourceGroup": "string",
   * 		"azureRegion": "string",
   * 		"azurePartnerTopic": "string"
   * 	}
   * },
   * {
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "splunk",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"splunkDomain": "string",
   * 		"splunkToken": "string",
   * 		"splunkPort": "string",
   * 		"splunkSecure": "boolean"
   * 	}
   * },
   * {
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "sumo",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"sumoSourceAddress": "string",
   * 	}
   * },
   * {
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "datadog",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"datadogRegion": "string",
   * 		"datadogApiKey": "string"
   * 	}
   * }]</code></pre>
   *
   * Get log streams
   *
   * @throws {RequiredError}
   */
  async getAll(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetLogStreams200ResponseInner>>> {
    const response = await this.request(
      {
        path: `/log-streams`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a log stream configuration and status.
   * <h5>Sample responses</h5><h5>Amazon EventBridge Log Stream</h5><pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "eventbridge",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"awsAccountId": "string",
   * 		"awsRegion": "string",
   * 		"awsPartnerEventSource": "string"
   * 	}
   * }</code></pre> <h5>HTTP Log Stream</h5><pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "http",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"httpContentFormat": "JSONLINES|JSONARRAY",
   * 		"httpContentType": "string",
   * 		"httpEndpoint": "string",
   * 		"httpAuthorization": "string"
   * 	}
   * }</code></pre> <h5>Datadog Log Stream</h5><pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "datadog",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"datadogRegion": "string",
   * 		"datadogApiKey": "string"
   * 	}
   * }</code></pre> <h5>Splunk Log Stream</h5><pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "splunk",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"splunkDomain": "string",
   * 		"splunkToken": "string",
   * 		"splunkPort": "string",
   * 		"splunkSecure": "boolean"
   * 	}
   * }</code></pre> <h5>Sumo Logic Log Stream</h5><pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "sumo",
   * 	"status": "active|paused|suspended",
   * 	"sink": {
   * 		"sumoSourceAddress": "string",
   * 	}
   * }</code></pre> <h5>Status</h5> The <code>status</code> of a log stream maybe any of the following:
   * 1. <code>active</code> - Stream is currently enabled.
   * 2. <code>paused</code> - Stream is currently user disabled and will not attempt log delivery.
   * 3. <code>suspended</code> - Stream is currently disabled because of errors and will not attempt log delivery.
   *
   * Get log stream by ID
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetLogStreamsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetLogStreams200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/log-streams/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a log stream.
   * <h4>Examples of how to use the PATCH endpoint.</h4> The following fields may be updated in a PATCH operation: <ul><li>name</li><li>status</li><li>sink</li></ul> Note: For log streams of type <code>eventbridge</code> and <code>eventgrid</code>, updating the <code>sink</code> is not permitted.
   * <h5>Update the status of a log stream</h5><pre><code>{
   * 	"status": "active|paused"
   * }</code></pre>
   * <h5>Update the name of a log stream</h5><pre><code>{
   * 	"name": "string"
   * }</code></pre>
   * <h5>Update the sink properties of a stream of type <code>http</code></h5><pre><code>{
   *   "sink": {
   *     "httpEndpoint": "string",
   *     "httpContentType": "string",
   *     "httpContentFormat": "JSONARRAY|JSONLINES",
   *     "httpAuthorization": "string"
   *   }
   * }</code></pre>
   * <h5>Update the sink properties of a stream of type <code>datadog</code></h5><pre><code>{
   *   "sink": {
   * 		"datadogRegion": "string",
   * 		"datadogApiKey": "string"
   *   }
   * }</code></pre>
   * <h5>Update the sink properties of a stream of type <code>splunk</code></h5><pre><code>{
   *   "sink": {
   *     "splunkDomain": "string",
   *     "splunkToken": "string",
   *     "splunkPort": "string",
   *     "splunkSecure": "boolean"
   *   }
   * }</code></pre>
   * <h5>Update the sink properties of a stream of type <code>sumo</code></h5><pre><code>{
   *   "sink": {
   *     "sumoSourceAddress": "string"
   *   }
   * }</code></pre>
   * Update a log stream
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchLogStreamsByIdOperationRequest,
    bodyParameters: PatchLogStreamsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetLogStreams200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/log-streams/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a log stream.
   * <h5>Log Stream Types</h5> The <code>type</code> of log stream being created determines the properties required in the <code>sink</code> payload.
   * <h5>HTTP Stream</h5> For an <code>http</code> Stream, the <code>sink</code> properties are listed in the payload below
   * Request: <pre><code>{
   * 	"name": "string",
   * 	"type": "http",
   * 	"sink": {
   * 		"httpEndpoint": "string",
   * 		"httpContentType": "string",
   * 		"httpContentFormat": "JSONLINES|JSONARRAY",
   * 		"httpAuthorization": "string"
   * 	}
   * }</code></pre>
   * Response: <pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "http",
   * 	"status": "active",
   * 	"sink": {
   * 		"httpEndpoint": "string",
   * 		"httpContentType": "string",
   * 		"httpContentFormat": "JSONLINES|JSONARRAY",
   * 		"httpAuthorization": "string"
   * 	}
   * }</code></pre>
   * <h5>Amazon EventBridge Stream</h5> For an <code>eventbridge</code> Stream, the <code>sink</code> properties are listed in the payload below
   * Request: <pre><code>{
   * 	"name": "string",
   * 	"type": "eventbridge",
   * 	"sink": {
   * 		"awsRegion": "string",
   * 		"awsAccountId": "string"
   * 	}
   * }</code></pre>
   * The response will include an additional field <code>awsPartnerEventSource</code> in the <code>sink</code>: <pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "eventbridge",
   * 	"status": "active",
   * 	"sink": {
   * 		"awsAccountId": "string",
   * 		"awsRegion": "string",
   * 		"awsPartnerEventSource": "string"
   * 	}
   * }</code></pre>
   * <h5>Azure Event Grid Stream</h5> For an <code>Azure Event Grid</code> Stream, the <code>sink</code> properties are listed in the payload below
   * Request: <pre><code>{
   * 	"name": "string",
   * 	"type": "eventgrid",
   * 	"sink": {
   * 		"azureSubscriptionId": "string",
   * 		"azureResourceGroup": "string",
   * 		"azureRegion": "string"
   * 	}
   * }</code></pre>
   * Response: <pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "http",
   * 	"status": "active",
   * 	"sink": {
   * 		"azureSubscriptionId": "string",
   * 		"azureResourceGroup": "string",
   * 		"azureRegion": "string",
   * 		"azurePartnerTopic": "string"
   * 	}
   * }</code></pre>
   * <h5>Datadog Stream</h5> For a <code>Datadog</code> Stream, the <code>sink</code> properties are listed in the payload below
   * Request: <pre><code>{
   * 	"name": "string",
   * 	"type": "datadog",
   * 	"sink": {
   * 		"datadogRegion": "string",
   * 		"datadogApiKey": "string"
   * 	}
   * }</code></pre>
   * Response: <pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "datadog",
   * 	"status": "active",
   * 	"sink": {
   * 		"datadogRegion": "string",
   * 		"datadogApiKey": "string"
   * 	}
   * }</code></pre>
   * <h5>Splunk Stream</h5> For a <code>Splunk</code> Stream, the <code>sink</code> properties are listed in the payload below
   * Request: <pre><code>{
   * 	"name": "string",
   * 	"type": "splunk",
   * 	"sink": {
   * 		"splunkDomain": "string",
   * 		"splunkToken": "string",
   * 		"splunkPort": "string",
   * 		"splunkSecure": "boolean"
   * 	}
   * }</code></pre>
   * Response: <pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "splunk",
   * 	"status": "active",
   * 	"sink": {
   * 		"splunkDomain": "string",
   * 		"splunkToken": "string",
   * 		"splunkPort": "string",
   * 		"splunkSecure": "boolean"
   * 	}
   * }</code></pre>
   * <h5>Sumo Logic Stream</h5> For a <code>Sumo Logic</code> Stream, the <code>sink</code> properties are listed in the payload below
   * Request: <pre><code>{
   * 	"name": "string",
   * 	"type": "sumo",
   * 	"sink": {
   * 		"sumoSourceAddress": "string",
   * 	}
   * }</code></pre>
   * Response: <pre><code>{
   * 	"id": "string",
   * 	"name": "string",
   * 	"type": "sumo",
   * 	"status": "active",
   * 	"sink": {
   * 		"sumoSourceAddress": "string",
   * 	}
   * }</code></pre>
   *
   * Create a log stream
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostLogStreamsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetLogStreams200ResponseInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/log-streams`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
