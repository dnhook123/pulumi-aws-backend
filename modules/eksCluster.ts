import * as awsx from '@pulumi/awsx';
import * as eks from '@pulumi/eks';
import {ComponentResource} from '@pulumi/pulumi';
import {Namespace} from './namespace';

class EksCluster extends ComponentResource {
  readonly vpc: awsx.ec2.Vpc;

  readonly cluster: eks.Cluster;

  readonly namespace: Namespace;

  constructor(clusterName: string, deployDashboard: boolean) {
    super('david:EksCluster', clusterName);

    this.vpc = new awsx.ec2.Vpc(
        `${eks}-vpc`,
        {
          numberOfAvailabilityZones: 2,
          subnets: [{
            type: 'public',
            tags: {
              'cluster_tag': 'owned',
              'kubernetes.io/role/elb': '1',
            },
          }, {
            type: 'private',
            tags: {
              'cluster_tag': 'owned',
              'kubernetes.io/role/elb': '1',
            },
          },
          ],
        },
    );

    this.cluster = new eks.Cluster(`${clusterName}-eks`, {
      version: '1.19',
      vpcId: this.vpc.id,
      subnetIds: this.vpc.publicSubnetIds,
      desiredCapacity: 2,
      minSize: 1,
      maxSize: 2,
      storageClasses: 'gp2',
      deployDashboard: deployDashboard.valueOf(),
      createOidcProvider: true,
    });

    this.namespace = new Namespace('namespace-name');
  }
}

export default EksCluster;
