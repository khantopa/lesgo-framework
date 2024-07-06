import { S3Client } from '@aws-sdk/client-s3';
export interface GetClientOptions {
    region: string;
    singletonConn: string;
}
declare const getClient: ({ region, singletonConn }: GetClientOptions) => S3Client;
export default getClient;
