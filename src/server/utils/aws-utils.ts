import * as AWS from 'aws-sdk';
import * as stream from 'stream';
class AWSUtils {

    private id = 'AKIA2O4DJVTOAZEJSUPC';
    private secret = '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';

    // 'http://brain-beat.s3.amazonaws.com/'
    bucket = 'brainbeat';

    uploadFile(file: any) {
        const s3 = this.getS3();
        const obj: AWS.S3.PutObjectRequest = {
            Bucket: this.bucket,
            Key: `section-${file.originalname}`,
            Body: this.bufferToStream(file.buffer)
        };
        // console.log('upload s3 = ', obj);
        return s3.upload(obj);
        // return s3.upload(obj, (err, data) => {
        //     if(err) {
        //         return Promise.reject(err);
        //     }
        //     console.log(data);
            
        //     return Promise.resolve(data);
        // });
        // console.log('upload resp = ', upload);
        
        // return Promise.resolve(upload);
    }

    getFiles() {
        const s3 = this.getS3();
        const obj: AWS.S3.ListObjectsRequest = {
            Bucket: this.bucket
        };
        return s3.listObjects(obj);
    }


    bufferToStream(file) {
        const ds = new stream.Duplex();
        ds.push(file);
        ds.push(null);
        return ds;
    }

    createBucket() {
        const s3 = this.getS3();
        const params = {
            Bucket: this.bucket,
            CreateBucketConfiguration: {
                // Set your region here
                LocationConstraint: 'ap-south-1'
            }
        };
        s3.createBucket(params, (err: AWS.AWSError, data: AWS.S3.CreateBucketOutput) => {
            if(err) {
                console.log(err);
                return;
            }

            console.log(data);
            
        });
    }

    checkAndCreateBucket() {
        console.log('Check and create s3');
        
        const s3 = this.getS3();
        s3.listBuckets((err: AWS.AWSError, data: AWS.S3.ListBucketsOutput) => {
            if(err) {
                console.log(err);
                return;
            }
            if(data.Buckets && data.Buckets.length) {
                let isFind = false;
                for(const bucket of data.Buckets) {
                    if(bucket.Name === this.bucket) {
                        isFind = true;
                        break;
                    }
                }
                if(isFind) {
                    return;
                }
                this.createBucket();
            }
            
        })
    }

    getS3() {
        return new AWS.S3({
            accessKeyId: this.id,
            secretAccessKey: this.secret,
            region: 'ap-south-1'
        });
    }
}

export default new AWSUtils();