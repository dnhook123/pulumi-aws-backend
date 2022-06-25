import {getStack, Config} from '@pulumi/pulumi';
import EksCluster from './modules/eksCluster';
import {Rds} from './modules/rds';
import {App} from './modules/app';
import {core} from '@pulumi/kubernetes';
import {AwsLoadBalancer} from "./modules/awsLoadBalancer";
import {RdsArgs} from "./modules/pulumi-interfaces/rds";

const stack = getStack();
const stackConfig = new Config('backend-api-aws');

const config = {
  // eks
  appName: stackConfig.require('app-name'),
  port: stackConfig.requireNumber('port'),
  imageUrl: stackConfig.require('imageUrl'),
  replica: stackConfig.requireNumber('replica'),
  deployDashboard: stackConfig.requireBoolean('deployDashboard'),
  // db
  engine: stackConfig.require('engine'),
  userName: stackConfig.requireSecret('userName'),
  password: stackConfig.requireSecret('password'),
};

const rdsArgs: RdsArgs = {
identifier: stackConfig
}

const rds = new Rds(
    `${config.appName}-${stack}`,
   rdsArgs
);

const eksCluster = new EksCluster(
    'eks-name',
    config.deployDashboard,
);

const namespace = new core.v1.Namespace(stackConfig.require('app-name'));

const app = new App(
    config.appName,
    config.port,
    config.imageUrl,
    namespace.namespace,
    config.replica,
);
const awsLoadBalancer = new AwsLoadBalancer(
    eksCluster.cluster.core.oidcProvider.arn,
    eksCluster.cluster.kubeconfig,
    eksCluster.vpcConfig.id,
    eksCluster.cluster.eksCluster.name,
);
