import {rds} from '@pulumi/aws';
import {RdsArgs} from "./pulumi-interfaces/rds";

export class Rds {
  private readonly db: rds.Instance;
  constructor(
      name: string,
      rdsArgs: RdsArgs
  ) {
    this.db = new rds.Instance(
        `${name}-rds`,
        {
          identifier: rdsArgs.identifier,
          instanceClass: rdsArgs.instanceClass,
          allocatedStorage: rdsArgs.allocatedStorage,
          dbName: rdsArgs.dbName,
          username: rdsArgs.username,
          engine: rdsArgs.engine,
          backupWindow: rdsArgs.backupWindow,
          skipFinalSnapshot: rdsArgs.skipFinalSnapshot,
          backupRetentionPeriod: rdsArgs.backupRetentionPeriod,
          maintenanceWindow:rdsArgs.maintenanceWindow,
        },
    );
  }
}
