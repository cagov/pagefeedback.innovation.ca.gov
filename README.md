# pagefeedback.innovation.ca.gov

Page feedback endpoints that receive data from many sites

## Development

This project was developed with <a href="https://openjsf.org/">Open JS Foundation</a> backed project <a href="https://arc.codes/">Architect</a>. This project provides a quick setup of a local development environment based on AWS Lambda/DynamoDB.

Local environment setup:

```
npm install
npx arc sandbox
```

### Testing

Local tests using tape may be run with:

```
npm test
```

### Deployment

Follows standard Architect deployment instructions.

Deploy to staging:

```
npx arc deploy
```

Deploy to production:

```
npx arc deploy --production
```


## Data collection

- This project receives data from several websites, writes it to AWS DynamoDB.
- The data fro DynamoDB is synched via 5Tran to Google Cloud
- From there the ODI data team builds several dashboards for secure data review by site owners