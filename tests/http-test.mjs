import test from 'tape';
import tiny from 'tiny-json-http';
import sandbox from '@architect/sandbox';
import arc from '@architect/functions';

const targetServer = 'http://localhost:3333';

/**
 * first we need to start the local http server
 */
test('sandbox.start', async t=> {
  t.plan(1)
  await sandbox.start({ quiet: true })
  t.ok(true, `sandbox started on ${targetServer}`)
})

test('post /sendfeedback', async t=> {
  t.plan(1)
  console.log( targetServer+'/sendfeedback')
  let result = await tiny.post({
    url: targetServer+'/sendfeedback',
    data: {
      url: 'https://awebsite.ca.gov/program/',
      helpful: 'yes',
      comments: 'Got what I needed, thanks!',
    }
  })
  t.ok(result.body.json.hasOwnProperty('feedbackKey'), 'got feedback response back')
  console.log(result.body)
})

// scan and get feedback
test('db', async t => {
  t.plan(1)
  let data = await arc.tables()
  let feedback = await data.feedback.scan({})
  // console.log(feedback)
  t.ok(Array.isArray(feedback.Items), 'found some items')
})

/**
 * finally close the server so we cleanly exit the test
 */
test('sandbox.end', async t=> {
  t.plan(1)
  await sandbox.end()
  t.ok(true, 'sandbox ended')
})