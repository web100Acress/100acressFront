#!/bin/bash

# CDN Cache Invalidation Script for 100acress.com
# Use after image updates or deployments

DISTRIBUTION_ID="EMYRE5WMDKCTJ"

echo "🚀 Invalidating CDN cache..."

# Create invalidation for all paths
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text

echo "✅ CDN cache invalidation initiated"
echo "⏳ Waiting for invalidation to complete..."

# Wait for invalidation to complete
aws cloudfront wait invalidation-completed \
    --distribution-id $DISTRIBUTION_ID \
    --id $(aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)

echo "🎉 CDN cache invalidated successfully!"
echo "🌐 Fresh content will be served from edge locations"
