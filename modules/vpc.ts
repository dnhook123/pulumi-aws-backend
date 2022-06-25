import {
ec2,
} from '@pulumi/awsx';
import { Output } from '@pulumi/pulumi';
import { ClusterVpcArgs } from '../../platform-component/module-args/sane-vpc-args';

export class Vpc {
  private readonly vpc: ec2.Vpc;

  constructor(
    name:string,
    vpcArgs: ClusterVpcArgs,
  ) {
    if (vpcArgs == null || Object.keys(vpcArgs).length === 0) {
      this.vpc = ec2.Vpc.getDefault();
    } else {
      this.vpc = new ec2.Vpc(`${name}-vpc`, vpcArgs);
    }
  }

  public getPrivateSubnetIds(): Promise<void | Output<string>[]> {
    return this.vpc.privateSubnetIds;
  }

  public async getPublicSubnetIds(): Promise<Output<string>[]> {
    return this.vpc.publicSubnetIds;
  }

  public getVpcId():Output<string> {
    return this.vpc.id;
  }
}
