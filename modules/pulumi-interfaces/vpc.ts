import {CidrBlock, VpcSubnetArgs} from '@pulumi/awsx/ec2/vpc';
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';


export interface VpcArgs {
  numberOfNatGateways?: number;
  numberOfAvailabilityZones?: number;
  subnets?: VpcSubnetArgs[];
  cidrBlock?: CidrBlock;
  tags?: pulumi.Input<aws.Tags>;
}
