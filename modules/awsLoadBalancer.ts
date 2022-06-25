import { ComponentResource } from '@pulumi/pulumi';
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as k8s from '@pulumi/kubernetes';
import { createIamPolicy } from './policy';

export class AwsLoadBalancer extends ComponentResource {
  private readonly iamRole: aws.iam.Role;

  private readonly iamPolicy: aws.iam.Policy;

  private readonly iamPolicyAttachment: aws.iam.PolicyAttachment;

  private readonly namespace: k8s.core.v1.Namespace;

  private readonly provider: k8s.Provider;

  private readonly awsLoadBalancer: k8s.helm.v3.Chart;

  public aws_lb_ns = 'aws-lb-controller';

  constructor(
    oidcArn: pulumi.Output<string>,
    ckubeconfig : pulumi.Output<any>,
    vpcId: pulumi.Output<string>,
    clusterName: pulumi.Output<string>,
  ) {
    super('david:AwsLoadBalancer', 'weng');
    this.iamRole = new aws.iam.Role('aws-loadbalancer-controller-role', {
      assumeRolePolicy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Federated: oidcArn,
            },
            Action: 'sts:AssumeRoleWithWebIdentity',
          },
        ],
      },
    });
    this.iamPolicy = new aws.iam.Policy(
      'aws-loadbalancer-controller-policy',
      { policy: createIamPolicy() },
      { parent: this.iamRole },
    );
    this.iamPolicyAttachment = new aws.iam.PolicyAttachment(
      'aws-loadbalancer-controller-attachment',
      { policyArn: this.iamPolicy.arn, roles: [this.iamRole.name] },
      { parent: this.iamRole },

    );
    this.provider = new k8s.Provider(
      'provider',
      { kubeconfig: ckubeconfig },
    );
    this.namespace = new k8s.core.v1.Namespace(
      `${this.aws_lb_ns}-ns `,
      {
        metadata: {
          name: this.aws_lb_ns,
          labels: {
            'app.kubernetes.io/name': 'aws-load-balancer-controller',
          },
        },
      },
      {
        provider: this.provider,
        parent: this.provider,
      },
    );
    this.awsLoadBalancer = new k8s.helm.v3.Chart(
      'lb',

      {
        chart: 'aws-load-balancer-controller',
        version: '1.2.0',
        fetchOpts: { repo: 'https://aws.github.io/eks-charts' },
        namespace: this.namespace.metadata.name,
        values: {
          region: 'eu-west-1',
          serviceAccount: {
            name: 'aws-lb-controller-serviceaccount',
            create: true,
            namespace: `${this.namespace.metadata} aws-lb-controller-sa`,
            annotations: {
              'eks.amazonaws.com/role-arn':
              this.iamRole.arn,
            },
          },
          vpcId,
          clusterName,
          podLabels: {
            stack: pulumi.getStack(),
            app: 'aws-lb-controller',
          },
        },
      },
      { provider: this.provider, parent: this.namespace },
    );
  }
}
