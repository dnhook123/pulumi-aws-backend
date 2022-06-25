import {ComponentResource} from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

export class Namespace extends ComponentResource {
  public readonly namespace: k8s.core.v1.Namespace;

  constructor(name: string) {
    super('david:namespace', name);

    this.namespace = new k8s.core.v1.Namespace(
        `${name}-namespace`,
        {},
    );
  }
}

