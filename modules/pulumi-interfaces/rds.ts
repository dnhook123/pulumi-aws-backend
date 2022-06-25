/**
 * @interface
 * Interface for the RDS module arguments.
 *  considerable values to add in future
 *     publiclyAccessible?: boolean
 *     vpcSecurityGroupIds?: string[]
 *     dbSubnetGroupName?: string;
 *     enabledCloudwatchLogsExports?: string[];
 *     engineVersion?: string;
 *     instanceName?: string;
 *     kmsKeyId?: string;
 *     multiAz?: boolean;
 *     tags?: {key:string};
 *     tagsAll?: {key:string}
 *     engineVersion: string;
 */
export interface RdsArgs {
  identifier?: string;
  instanceClass?: string;
  dbName?: string;
  username?: string;
  password?: string;
  engine?: string;
  backupWindow?: string;
  allocatedStorage?: number;
  skipFinalSnapshot?: boolean;
  backupRetentionPeriod?: number;
  maintenanceWindow?: string;
}
