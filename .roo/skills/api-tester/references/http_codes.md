# HTTP Status Codes Reference

## 2xx Success

| Code | Name | Description |
|------|------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request succeeded, no content returned |

## 3xx Redirection

| Code | Name | Description |
|------|------|-------------|
| 301 | Moved Permanently | Resource moved to new URL |
| 302 | Found | Temporary redirect |
| 304 | Not Modified | Cached version is valid |

## 4xx Client Errors

| Code | Name | Description |
|------|------|-------------|
| 400 | Bad Request | Invalid request syntax |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |

## 5xx Server Errors

| Code | Name | Description |
|------|------|-------------|
| 500 | Internal Server Error | Server error |
| 502 | Bad Gateway | Invalid upstream response |
| 503 | Service Unavailable | Server temporarily unavailable |
| 504 | Gateway Timeout | Upstream timeout