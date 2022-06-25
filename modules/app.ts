import { ComponentResource } from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

export class App extends ComponentResource {
  private readonly deployment: k8s.apps.v1.Deployment;

  public readonly service: k8s.core.v1.Service;

  private readonly ingress: k8s.networking.v1.Ingress;

  constructor(
    name: string,
    port: number,
    imageUrl: string,
    namespace: k8s.core.v1.Namespace,
    replicas: number,
  ) {
    super('david:app', name);

    this.deployment = new k8s.apps.v1.Deployment(
      `${name}-deployment`,
      {
        metadata: {
          name,
          namespace: namespace.metadata.name,
          labels: { app: name },
        },
        spec: {
          replicas,
          selector: {
            matchLabels: { app: name },
          },
          template: {
            metadata: {
              labels: { app: name },
            },
            spec: {
              containers: [
                {
                  name,
                  image: imageUrl,
                  ports: [{ name: 'http', containerPort: port }],
                },
              ],
            },
          },
        },
      },

    );
    this.service = new k8s.core.v1.Service(
      `${name}-service`,
      {
        metadata: {
          name,
          namespace: namespace.metadata.name,
        },
        spec: {
          type: 'NodePort',
          ports: [{ port, targetPort: 'http' }],
          selector: { app: name },
        },
      },
    );

    this.ingress = new k8s.networking.v1.Ingress(
      `${name}-ingress`,
      {
        metadata: {
          name: `${name}-ingress`,
          namespace: namespace.metadata.name,
          annotations: {
            'kubernetes.io/ingress.class': 'alb',
            'alb.ingress.kubernetes.io/target-type': 'ip',
            'alb.ingress.kubernetes.io/scheme': 'internet-facing',
          },
        },
        spec: {
          rules: [{
            http: {
              paths: [{
                path: '/',
                pathType: 'Prefix',
                backend: {
                  service: {
                    name,
                    port: {
                      number: port,
                    },
                  },
                },
              }],
            },
          }],
        },
      },
    );
  }
}
