@app
pagefeedback-innovation-ca-gov

@cors

@http
get /
post /sendfeedback

@macros
arc-macro-cors

@shared

@tables
feedback
  siteDomain *String
  feedbackKey **String

@tables-indexes
feedback
  timestamp *String

@aws
region us-west-1
