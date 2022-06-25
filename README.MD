# Deploy backend app to EKS.

This template deploys an example Django backend api into EKS.

![](../../documentation/images/deploy-backend-api-aws.jpeg)
Following AWS products are being used:

- [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) managed container service to run and scale Kubernetes applications 
- [Amazon Application Load balancer](https://aws.amazon.com/elasticloadbalancing/application-load-balancer/) Load balance HTTP and HTTPS traffic with advanced request routing targeted at the delivery of modern applications.
- [Amazon Elastic Container Registry](https://aws.amazon.com/ecr/) is a fully managed Docker container registry that makes it easy to store, share, and deploy container images.
- [Amazon Relational Database service](https://aws.amazon.com/rds/) is a collection of managed services that makes it simple to set up, operate, and scale databases in the cloud. Choose from seven popular engines

Following Kubernetes resources are being used:

TODO

## Getting Started

Install prerequisites with:

```bash
npm install
```

## Configuration
Configure the template using ```pulumi config set dirname:key value```

Example:
```
pulumi config set backend-api-aws:clusterName david-eks
```
### EKS config

| Name              | Type    | Required | Description                           |
|-------------------|---------|----------|---------------------------------------|
| `clusterName`     | string  | Yes      | Cluster name EKS                      |
| `port`            | number  | Yes      | Port number of the app being deployed 
| `imageUrl`        | string  | Yes      | Image url that is located inside ECR  
| `replica`         | number  | Yes      | Amount of replicas in k8s app         |
| `deployDashboard` | boolean | Yes      | Enable kubernetes dashboard           |
### RDS config

| Name                      | Type   | Required | Description                                                             |
| ------------------------- |--------|----------|-------------------------------------------------------------------------|
| `dbName`             | string | Yes      | Database name (must begin with a letter and contain alphanumeric chars) |
| `engine`           | string | Yes      | SQL engine, just try the default "postgres" havent tried others         
| `userName`                 | string | Yes      | Database user                                                           
| `password`                  | string | Yes      | Database password                                                       |

## TODO in future
- Swap out Helm chart for native pulumi ALB
- Fix A record for the ALB to make backend domain more nice
- Fix HTTPS so it can be connected to the deployed frontend from the other template
- ECR hardcoded, maybe fix in future?

# Frequent modules bugs and problems
