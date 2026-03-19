#!/bin/bash

# AWS CDN Setup Script for 100acress.com
# Production-ready CloudFront + S3 configuration

set -e

echo "🚀 Setting up AWS CDN for 100acress.com..."

# Configuration
BUCKET_NAME="100acress-images"
CLOUDFRONT_COMMENT="100acress.com CDN - Production"
ORIGIN_ACCESS_CONTROL_NAME="100acress-oac"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install it first.${NC}"
    echo "brew install awscli  # or visit https://aws.amazon.com/cli/"
    exit 1
fi

# Check AWS credentials
echo "🔐 Checking AWS credentials..."
if ! aws sts get-caller-identity --output json &> /dev/null; then
    echo -e "${RED}❌ AWS credentials verification failed. Please check your credentials.${NC}"
    echo "Try running: aws configure"
    echo "Or check: ~/.aws/credentials"
    exit 1
fi

echo -e "${GREEN}✅ AWS credentials verified!${NC}"

# Step 1: Create S3 bucket
echo -e "${YELLOW}📦 Step 1: Creating S3 bucket...${NC}"
if aws s3 ls | grep -q $BUCKET_NAME; then
    echo "✅ Bucket $BUCKET_NAME already exists"
else
    aws s3 mb s3://$BUCKET_NAME --region ap-south-1
    echo "✅ Created bucket: $BUCKET_NAME"
fi

# Step 2: Create Origin Access Control
echo -e "${YELLOW}🔒 Step 2: Creating Origin Access Control...${NC}"
OAC_ID=$(aws cloudfront list-origin-access-controls --query "OriginAccessControlList.Items[?Name=='$ORIGIN_ACCESS_CONTROL_NAME'].Id" --output text | tr -d '\n')
if [ -n "$OAC_ID" ]; then
    echo "✅ OAC already exists: $OAC_ID"
else
    OAC_ID=$(aws cloudfront create-origin-access-control \
        --origin-access-control-config "{
            \"Name\": \"$ORIGIN_ACCESS_CONTROL_NAME\",
            \"OriginAccessControlOriginType\": \"s3\",
            \"SigningBehavior\": \"always\",
            \"SigningProtocol\": \"sigv4\"
        }" \
        --query 'OriginAccessControl.Id' \
        --output text)
    echo "✅ Created OAC: $OAC_ID"
fi

# Step 3: Update S3 bucket policy
echo -e "${YELLOW}📋 Step 3: Updating S3 bucket policy...${NC}"
aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy file://scripts/bucket-policy.json

echo "✅ Updated bucket policy for CloudFront access"

# Step 4: Create CloudFront distribution
echo -e "${YELLOW}⚡ Step 4: Creating CloudFront distribution...${NC}"
DISTRIBUTION_CONFIG="{
    \"CallerReference\": \"100acress-cdn-$(date +%s)\",
    \"Comment\": \"$CLOUDFRONT_COMMENT\",
    \"DefaultRootObject\": \"\",
    \"Origins\": {
        \"Quantity\": 1,
        \"Items\": [
            {
                \"Id\": \"S3-$BUCKET_NAME\",
                \"DomainName\": \"$BUCKET_NAME.s3.ap-south-1.amazonaws.com\",
                \"S3OriginConfig\": {
                    \"OriginAccessControlId\": \"$OAC_ID\"
                }
            }
        ]
    },
    \"DefaultCacheBehavior\": {
        \"TargetOriginId\": \"S3-$BUCKET_NAME\",
        \"ViewerProtocolPolicy\": \"redirect-to-https\",
        \"TrustedSigners\": {
            \"Enabled\": false,
            \"Quantity\": 0
        },
        \"ForwardedValues\": {
            \"QueryString\": true,
            \"Cookies\": {
                \"Forward\": \"none\"
            }
        },
        \"MinTTL\": 0,
        \"DefaultTTL\": 86400,
        \"MaxTTL\": 31536000,
        \"Compress\": true
    },
    \"CacheBehaviors\": {
        \"Quantity\": 0
    },
    \"Enabled\": true,
    \"PriceClass\": \"PriceClass_100\",
    \"ViewerCertificate\": {
        \"CloudFrontDefaultCertificate\": true,
        \"MinimumProtocolVersion\": \"TLSv1.2_2021\"
    },
    \"Restrictions\": {
        \"GeoRestriction\": {
            \"RestrictionType\": \"none\",
            \"Quantity\": 0
        }
    }
}"

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config "$DISTRIBUTION_CONFIG" \
    --query 'Distribution.Id' \
    --output text)

echo "✅ Created CloudFront distribution: $DISTRIBUTION_ID"

# Step 5: Wait for distribution to deploy
echo -e "${YELLOW}⏳ Step 5: Waiting for CloudFront deployment...${NC}"
echo "This may take 10-15 minutes..."

aws cloudfront wait distribution-deployed --id $DISTRIBUTION_ID

# Get distribution domain name
DOMAIN_NAME=$(aws cloudfront get-distribution \
    --id $DISTRIBUTION_ID \
    --query 'Distribution.DomainName' \
    --output text)

echo -e "${GREEN}🎉 CDN Setup Complete!${NC}"
echo ""
echo "📋 IMPORTANT DETAILS:"
echo "🔗 CDN Domain: $DOMAIN_NAME"
echo "📦 S3 Bucket: $BUCKET_NAME"
echo "⚡ Distribution ID: $DISTRIBUTION_ID"
echo ""
echo "🚀 NEXT STEPS:"
echo "1. Add to your .env file:"
echo "   REACT_APP_CDN_URL=https://$DOMAIN_NAME"
echo ""
echo "2. Upload images to S3:"
echo "   aws s3 sync public/Images/ s3://$BUCKET_NAME/images/"
echo ""
echo "3. Test CDN:"
echo "   curl -I https://$DOMAIN_NAME/images/your-image.jpg"
echo ""
echo "🧪 VERIFICATION:"
echo "✅ Network tab should show: x-cache: Hit from cloudfront"
echo "✅ Response time should be < 100ms"
echo "✅ Headers should include: via: CloudFront"

# Save configuration to file
cat > cdn-config.txt << EOF
CDN Configuration for 100acress.com
=====================================
CDN URL: https://$DOMAIN_NAME
S3 Bucket: $BUCKET_NAME
Distribution ID: $DISTRIBUTION_ID
OAC ID: $OAC_ID

Environment Variable:
REACT_APP_CDN_URL=https://$DOMAIN_NAME

Upload Command:
aws s3 sync public/Images/ s3://$BUCKET_NAME/images/

Created: $(date)
EOF

echo -e "${GREEN}✅ Configuration saved to cdn-config.txt${NC}"
