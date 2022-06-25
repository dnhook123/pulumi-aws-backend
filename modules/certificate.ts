import { ComponentResource } from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

export class Certificate extends ComponentResource {
  private readonly certificate: aws.acm.Certificate;

  readonly certificateValidation: aws.acm.CertificateValidation;

  constructor(
    name: string,
    targetDomain: string,
  ) {
    super('david:Certificate', name);

    // ACM certificate must be in us-east-1 region, no exception..
    const eastRegion = new aws.Provider(
      `${name}-us-east-1-provider`,
      {
        profile: aws.config.profile,
        region: 'us-east-1',
      },
      { parent: this },
    );

    this.certificate = new aws.acm.Certificate(
      `${name}-certificate`,
      {
        domainName: targetDomain,
        validationMethod: 'DNS',
      },
      { provider: eastRegion, parent: this },
    );
  }
}
