---
name: api-tester
description: Test REST and GraphQL APIs with automated request validation, response checking, and collection management. Use when testing API endpoints, validating responses, or setting up API test suites.
---

# API Tester

Test REST and GraphQL APIs with comprehensive validation and reporting.

## When to use

- Testing REST API endpoints (GET, POST, PUT, DELETE, PATCH)
- Testing GraphQL queries and mutations
- Validating API responses against schemas
- Setting up automated API test collections
- Debugging API issues and analyzing responses
- Load testing API endpoints

## When NOT to use

- For browser-based UI testing (use webapp-testing instead)
- For database schema design (use database-designer instead)
- For security penetration testing (use security-auditor instead)

## Inputs required

- API base URL
- Endpoint paths and HTTP methods
- Request headers (optional)
- Request body/payload (for POST/PUT/PATCH)
- Expected response status codes (optional)
- Response schema for validation (optional)

## Workflow

1. **Analyze the API requirements**
   - Identify the API type (REST or GraphQL)
   - List endpoints to test
   - Determine authentication method

2. **Create test requests**
   - For REST: Use curl commands or HTTP client scripts
   - For GraphQL: Structure queries/mutations properly
   - Include necessary headers (Authorization, Content-Type)

3. **Execute tests**
   - Run individual endpoint tests
   - Check response status codes
   - Validate response body structure
   - Measure response times

4. **Generate test report**
   - Document test results
   - Identify failing tests
   - Suggest fixes for issues

## Examples

### Testing a REST API endpoint

```bash
curl -X GET "https://api.example.com/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

### Testing a GraphQL query

```bash
curl -X POST "https://api.example.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { id name email } }"}'
```

## Troubleshooting

- **401 Unauthorized**: Check authentication token validity
- **404 Not Found**: Verify endpoint URL and path
- **500 Internal Server Error**: Check server logs or try with different payload
- **Timeout**: Increase timeout or check network connectivity

## Files

- `references/http_codes.md` - Common HTTP status codes reference
- `scripts/test_api.sh` - Bash script for automated API testing
- `assets/postman_collection_template.json` - Postman collection template