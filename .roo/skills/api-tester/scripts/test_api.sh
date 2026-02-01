#!/bin/bash
# API Testing Script
# Usage: ./test_api.sh <base_url> <endpoint> <method> [payload]

BASE_URL=$1
ENDPOINT=$2
METHOD=${3:-GET}
PAYLOAD=$4
TOKEN=${API_TOKEN:-""}

if [ -z "$BASE_URL" ] || [ -z "$ENDPOINT" ]; then
    echo "Usage: $0 <base_url> <endpoint> <method> [payload]"
    echo "Example: $0 https://api.example.com /users GET"
    exit 1
fi

URL="${BASE_URL}${ENDPOINT}"

echo "Testing: $METHOD $URL"
echo "----------------------------------------"

if [ "$METHOD" == "GET" ]; then
    curl -s -w "\nHTTP_CODE: %{http_code}\nTIME: %{time_total}s\n" \
         -H "Authorization: Bearer $TOKEN" \
         -H "Accept: application/json" \
         "$URL"
elif [ "$METHOD" == "POST" ] || [ "$METHOD" == "PUT" ] || [ "$METHOD" == "PATCH" ]; then
    curl -s -w "\nHTTP_CODE: %{http_code}\nTIME: %{time_total}s\n" \
         -X "$METHOD" \
         -H "Authorization: Bearer $TOKEN" \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d "$PAYLOAD" \
         "$URL"
elif [ "$METHOD" == "DELETE" ]; then
    curl -s -w "\nHTTP_CODE: %{http_code}\nTIME: %{time_total}s\n" \
         -X DELETE \
         -H "Authorization: Bearer $TOKEN" \
         "$URL"
fi