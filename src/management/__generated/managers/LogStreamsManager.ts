import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type {
  GetLogStreams200ResponseInner,
  PatchLogStreamsByIdRequest,
  PostLogStreamsRequest,
} from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

export interface DeleteLogStreamsByIdRequest {
  /**
   * The id of the log stream to delete
   * @type {string}
   */
  id: string;
}

export interface GetLogStreamsByIdRequest {
  /**
   * The id of the log stream to get
   * @type {string}
   */
  id: string;
}

export interface PatchLogStreamsByIdOperationRequest {
  /**
   * The id of the log stream to get
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class LogStreamsManager extends BaseAPI {
  /**
   * Delete a log stream.
   *
   * Delete log stream
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteLogStreamsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/log-streams/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a log stream.<br/>
   * Delete log stream
   */
  async delete(
    requestParameters: DeleteLogStreamsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
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
   * @throws {RequiredError}
   */
  async getAllRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Array<GetLogStreams200ResponseInner>>> {
    const response = await this.request(
      {
        path: `/log-streams`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve details on <a href=\"https://auth0.com/docs/logs/streams\">log streams</a>.<br/><h5>Sample Response</h5><pre><code>[{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"eventbridge\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"awsAccountId\": \"string\",<br/>  \"awsRegion\": \"string\",<br/>  \"awsPartnerEventSource\": \"string\"<br/> }<br/>}, {<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"http\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"httpContentFormat\": \"JSONLINES|JSONARRAY\",<br/>  \"httpContentType\": \"string\",<br/>  \"httpEndpoint\": \"string\",<br/>  \"httpAuthorization\": \"string\"<br/> }<br/>},<br/>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"eventgrid\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"azureSubscriptionId\": \"string\",<br/>  \"azureResourceGroup\": \"string\",<br/>  \"azureRegion\": \"string\",<br/>  \"azurePartnerTopic\": \"string\"<br/> }<br/>},<br/>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"splunk\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"splunkDomain\": \"string\",<br/>  \"splunkToken\": \"string\",<br/>  \"splunkPort\": \"string\",<br/>  \"splunkSecure\": \"boolean\"<br/> }<br/>},<br/>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"sumo\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"sumoSourceAddress\": \"string\",<br/> }<br/>},<br/>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"datadog\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"datadogRegion\": \"string\",<br/>  \"datadogApiKey\": \"string\"<br/> }<br/>}]</code></pre><br/>
   * Get log streams
   */
  async getAll(initOverrides?: InitOverrides): Promise<Array<GetLogStreams200ResponseInner>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetLogStreamsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<GetLogStreams200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/log-streams/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a log stream configuration and status.<br/><h5>Sample responses</h5><h5>Amazon EventBridge Log Stream</h5><pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"eventbridge\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"awsAccountId\": \"string\",<br/>  \"awsRegion\": \"string\",<br/>  \"awsPartnerEventSource\": \"string\"<br/> }<br/>}</code></pre> <h5>HTTP Log Stream</h5><pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"http\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"httpContentFormat\": \"JSONLINES|JSONARRAY\",<br/>  \"httpContentType\": \"string\",<br/>  \"httpEndpoint\": \"string\",<br/>  \"httpAuthorization\": \"string\"<br/> }<br/>}</code></pre> <h5>Datadog Log Stream</h5><pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"datadog\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"datadogRegion\": \"string\",<br/>  \"datadogApiKey\": \"string\"<br/> }<br/>}</code></pre> <h5>Splunk Log Stream</h5><pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"splunk\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"splunkDomain\": \"string\",<br/>  \"splunkToken\": \"string\",<br/>  \"splunkPort\": \"string\",<br/>  \"splunkSecure\": \"boolean\"<br/> }<br/>}</code></pre> <h5>Sumo Logic Log Stream</h5><pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"sumo\",<br/> \"status\": \"active|paused|suspended\",<br/> \"sink\": {<br/>  \"sumoSourceAddress\": \"string\",<br/> }<br/>}</code></pre> <h5>Status</h5> The <code>status</code> of a log stream maybe any of the following:<br/>1. <code>active</code> - Stream is currently enabled.<br/>2. <code>paused</code> - Stream is currently user disabled and will not attempt log delivery.<br/>3. <code>suspended</code> - Stream is currently disabled because of errors and will not attempt log delivery.<br/>
   * Get log stream by ID
   */
  async get(
    requestParameters: GetLogStreamsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<GetLogStreams200ResponseInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchLogStreamsByIdOperationRequest,
    bodyParameters: PatchLogStreamsByIdRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update a log stream.<br/><h4>Examples of how to use the PATCH endpoint.</h4> The following fields may be updated in a PATCH operation: <ul><li>name</li><li>status</li><li>sink</li></ul> Note: For log streams of type <code>eventbridge</code> and <code>eventgrid</code>, updating the <code>sink</code> is not permitted.<br/><h5>Update the status of a log stream</h5><pre><code>{<br/> \"status\": \"active|paused\"<br/>}</code></pre><br/><h5>Update the name of a log stream</h5><pre><code>{<br/> \"name\": \"string\"<br/>}</code></pre><br/><h5>Update the sink properties of a stream of type <code>http</code></h5><pre><code>{<br/>  \"sink\": {<br/>    \"httpEndpoint\": \"string\",<br/>    \"httpContentType\": \"string\",<br/>    \"httpContentFormat\": \"JSONARRAY|JSONLINES\",<br/>    \"httpAuthorization\": \"string\"<br/>  }<br/>}</code></pre><br/><h5>Update the sink properties of a stream of type <code>datadog</code></h5><pre><code>{<br/>  \"sink\": {<br/>  \"datadogRegion\": \"string\",<br/>  \"datadogApiKey\": \"string\"<br/>  }<br/>}</code></pre><br/><h5>Update the sink properties of a stream of type <code>splunk</code></h5><pre><code>{<br/>  \"sink\": {<br/>    \"splunkDomain\": \"string\",<br/>    \"splunkToken\": \"string\",<br/>    \"splunkPort\": \"string\",<br/>    \"splunkSecure\": \"boolean\"<br/>  }<br/>}</code></pre><br/><h5>Update the sink properties of a stream of type <code>sumo</code></h5><pre><code>{<br/>  \"sink\": {<br/>    \"sumoSourceAddress\": \"string\"<br/>  }<br/>}</code></pre>
   * Update a log stream
   */
  async update(
    requestParameters: PatchLogStreamsByIdOperationRequest,
    bodyParameters: PatchLogStreamsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<GetLogStreams200ResponseInner> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async createRaw(
    bodyParameters: PostLogStreamsRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a log stream.<br/><h5>Log Stream Types</h5> The <code>type</code> of log stream being created determines the properties required in the <code>sink</code> payload.<br/><h5>HTTP Stream</h5> For an <code>http</code> Stream, the <code>sink</code> properties are listed in the payload below<br/>Request: <pre><code>{<br/> \"name\": \"string\",<br/> \"type\": \"http\",<br/> \"sink\": {<br/>  \"httpEndpoint\": \"string\",<br/>  \"httpContentType\": \"string\",<br/>  \"httpContentFormat\": \"JSONLINES|JSONARRAY\",<br/>  \"httpAuthorization\": \"string\"<br/> }<br/>}</code></pre><br/>Response: <pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"http\",<br/> \"status\": \"active\",<br/> \"sink\": {<br/>  \"httpEndpoint\": \"string\",<br/>  \"httpContentType\": \"string\",<br/>  \"httpContentFormat\": \"JSONLINES|JSONARRAY\",<br/>  \"httpAuthorization\": \"string\"<br/> }<br/>}</code></pre><br/><h5>Amazon EventBridge Stream</h5> For an <code>eventbridge</code> Stream, the <code>sink</code> properties are listed in the payload below<br/>Request: <pre><code>{<br/> \"name\": \"string\",<br/> \"type\": \"eventbridge\",<br/> \"sink\": {<br/>  \"awsRegion\": \"string\",<br/>  \"awsAccountId\": \"string\"<br/> }<br/>}</code></pre><br/>The response will include an additional field <code>awsPartnerEventSource</code> in the <code>sink</code>: <pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"eventbridge\",<br/> \"status\": \"active\",<br/> \"sink\": {<br/>  \"awsAccountId\": \"string\",<br/>  \"awsRegion\": \"string\",<br/>  \"awsPartnerEventSource\": \"string\"<br/> }<br/>}</code></pre><br/><h5>Azure Event Grid Stream</h5> For an <code>Azure Event Grid</code> Stream, the <code>sink</code> properties are listed in the payload below<br/>Request: <pre><code>{<br/> \"name\": \"string\",<br/> \"type\": \"eventgrid\",<br/> \"sink\": {<br/>  \"azureSubscriptionId\": \"string\",<br/>  \"azureResourceGroup\": \"string\",<br/>  \"azureRegion\": \"string\"<br/> }<br/>}</code></pre><br/>Response: <pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"http\",<br/> \"status\": \"active\",<br/> \"sink\": {<br/>  \"azureSubscriptionId\": \"string\",<br/>  \"azureResourceGroup\": \"string\",<br/>  \"azureRegion\": \"string\",<br/>  \"azurePartnerTopic\": \"string\"<br/> }<br/>}</code></pre><br/><h5>Datadog Stream</h5> For a <code>Datadog</code> Stream, the <code>sink</code> properties are listed in the payload below<br/>Request: <pre><code>{<br/> \"name\": \"string\",<br/> \"type\": \"datadog\",<br/> \"sink\": {<br/>  \"datadogRegion\": \"string\",<br/>  \"datadogApiKey\": \"string\"<br/> }<br/>}</code></pre><br/>Response: <pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"datadog\",<br/> \"status\": \"active\",<br/> \"sink\": {<br/>  \"datadogRegion\": \"string\",<br/>  \"datadogApiKey\": \"string\"<br/> }<br/>}</code></pre><br/><h5>Splunk Stream</h5> For a <code>Splunk</code> Stream, the <code>sink</code> properties are listed in the payload below<br/>Request: <pre><code>{<br/> \"name\": \"string\",<br/> \"type\": \"splunk\",<br/> \"sink\": {<br/>  \"splunkDomain\": \"string\",<br/>  \"splunkToken\": \"string\",<br/>  \"splunkPort\": \"string\",<br/>  \"splunkSecure\": \"boolean\"<br/> }<br/>}</code></pre><br/>Response: <pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"splunk\",<br/> \"status\": \"active\",<br/> \"sink\": {<br/>  \"splunkDomain\": \"string\",<br/>  \"splunkToken\": \"string\",<br/>  \"splunkPort\": \"string\",<br/>  \"splunkSecure\": \"boolean\"<br/> }<br/>}</code></pre><br/><h5>Sumo Logic Stream</h5> For a <code>Sumo Logic</code> Stream, the <code>sink</code> properties are listed in the payload below<br/>Request: <pre><code>{<br/> \"name\": \"string\",<br/> \"type\": \"sumo\",<br/> \"sink\": {<br/>  \"sumoSourceAddress\": \"string\",<br/> }<br/>}</code></pre><br/>Response: <pre><code>{<br/> \"id\": \"string\",<br/> \"name\": \"string\",<br/> \"type\": \"sumo\",<br/> \"status\": \"active\",<br/> \"sink\": {<br/>  \"sumoSourceAddress\": \"string\",<br/> }<br/>}</code></pre><br/>
   * Create a log stream
   */
  async create(
    bodyParameters: PostLogStreamsRequest,
    initOverrides?: InitOverrides
  ): Promise<GetLogStreams200ResponseInner> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
