/**
 * @interface
 * Interface for the EKS module arguments
 * Considerable values to add in the future
 * enabledClusterLogTypes?: string[],
 * clusterTags: InputTags,
 * roleMappings?: RoleMapping[]
 * encryptionConfigKeyArn?: string
 * version?: string,
 * vpcId?: string,
 * privateSubnetIds?: string[]
 * publicSubnetIds: string[]
 * deployDashboard: boolean
 */
export interface EksArgs {
  name?: string,
  clusterTag?: string,
  version?: string,
  instanceType?: string
  desiredCapacity?: number,
  minSize?: number,
  maxSize?: number,
  createOidcProvider?: boolean,
  deployDashboard?: boolean,
}
