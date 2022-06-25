import { PolicyDocument } from '@pulumi/aws/iam';
import * as pulumi from '@pulumi/pulumi';

export function createIamPolicy(): pulumi.Input<string | PolicyDocument> {
  return {
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Action: [
        'iam:CreateServiceLinkedRole',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ec2:DescribeAccountAttributes',
        'ec2:DescribeAddresses',
        'ec2:DescribeAvailabilityZones',
        'ec2:DescribeInternetGateways',
        'ec2:DescribeVpcs',
        'ec2:DescribeVpcPeeringConnections',
        'ec2:DescribeSubnets',
        'ec2:DescribeSecurityGroups',
        'ec2:DescribeInstances',
        'ec2:DescribeNetworkInterfaces',
        'ec2:DescribeTags',
        'ec2:GetCoipPoolUsage',
        'ec2:DescribeCoipPools',
        'elasticloadbalancing:DescribeLoadBalancers',
        'elasticloadbalancing:DescribeLoadBalancerAttributes',
        'elasticloadbalancing:DescribeListeners',
        'elasticloadbalancing:DescribeListenerCertificates',
        'elasticloadbalancing:DescribeSSLPolicies',
        'elasticloadbalancing:DescribeRules',
        'elasticloadbalancing:DescribeTargetGroups',
        'elasticloadbalancing:DescribeTargetGroupAttributes',
        'elasticloadbalancing:DescribeTargetHealth',
        'elasticloadbalancing:DescribeTags',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'cognito-idp:DescribeUserPoolClient',
        'acm:ListCertificates',
        'acm:DescribeCertificate',
        'iam:ListServerCertificates',
        'iam:GetServerCertificate',
        'waf-regional:GetWebACL',
        'waf-regional:GetWebACLForResource',
        'waf-regional:AssociateWebACL',
        'waf-regional:DisassociateWebACL',
        'wafv2:GetWebACL',
        'wafv2:GetWebACLForResource',
        'wafv2:AssociateWebACL',
        'wafv2:DisassociateWebACL',
        'shield:GetSubscriptionState',
        'shield:DescribeProtection',
        'shield:CreateProtection',
        'shield:DeleteProtection',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ec2:AuthorizeSecurityGroupIngress',
        'ec2:RevokeSecurityGroupIngress',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ec2:CreateSecurityGroup',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ec2:CreateTags',
      ],
      Resource: 'arn:aws:ec2:*:*:security-group/*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ec2:CreateTags',
        'ec2:DeleteTags',
      ],
      Resource: 'arn:aws:ec2:*:*:security-group/*',

    },
    {
      Effect: 'Allow',
      Action: [
        'ec2:AuthorizeSecurityGroupIngress',
        'ec2:RevokeSecurityGroupIngress',
        'ec2:DeleteSecurityGroup',
      ],
      Resource: '*',

    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:CreateLoadBalancer',
        'elasticloadbalancing:CreateTargetGroup',
      ],
      Resource: '*',

    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:CreateListener',
        'elasticloadbalancing:DeleteListener',
        'elasticloadbalancing:CreateRule',
        'elasticloadbalancing:DeleteRule',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:AddTags',
        'elasticloadbalancing:RemoveTags',
      ],
      Resource: [
        'arn:aws:elasticloadbalancing:*:*:targetgroup/*/*',
        'arn:aws:elasticloadbalancing:*:*:loadbalancer/net/*/*',
        'arn:aws:elasticloadbalancing:*:*:loadbalancer/app/*/*',
      ],

    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:AddTags',
        'elasticloadbalancing:RemoveTags',
      ],
      Resource: [
        'arn:aws:elasticloadbalancing:*:*:listener/net/*/*/*',
        'arn:aws:elasticloadbalancing:*:*:listener/app/*/*/*',
        'arn:aws:elasticloadbalancing:*:*:listener-rule/net/*/*/*',
        'arn:aws:elasticloadbalancing:*:*:listener-rule/app/*/*/*',
      ],
    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:ModifyLoadBalancerAttributes',
        'elasticloadbalancing:SetIpAddressType',
        'elasticloadbalancing:SetSecurityGroups',
        'elasticloadbalancing:SetSubnets',
        'elasticloadbalancing:DeleteLoadBalancer',
        'elasticloadbalancing:ModifyTargetGroup',
        'elasticloadbalancing:ModifyTargetGroupAttributes',
        'elasticloadbalancing:DeleteTargetGroup',
      ],
      Resource: '*',

    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:RegisterTargets',
        'elasticloadbalancing:DeregisterTargets',
      ],
      Resource: 'arn:aws:elasticloadbalancing:*:*:targetgroup/*/*',
    },
    {
      Effect: 'Allow',
      Action: [
        'elasticloadbalancing:SetWebAcl',
        'elasticloadbalancing:ModifyListener',
        'elasticloadbalancing:AddListenerCertificates',
        'elasticloadbalancing:RemoveListenerCertificates',
        'elasticloadbalancing:ModifyRule',
      ],
      Resource: '*',
    },
    ],
  };
}
