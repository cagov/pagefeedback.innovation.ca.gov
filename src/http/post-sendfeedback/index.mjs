//@ts-check
import arc from '@architect/functions';

/**
 * @description Event receiving endpoint for benefits recommendation widget
 * @param {object} req
 * @typedef {object} req.body
 * @property {string} url url of the page the form was submitted from
 * @property {string} helpful Whether the visitor found the page helpful or not, recorded from button presses
 * @property {string} comments Content submitted in the comment textarea
 */

export async function handler(req) {
  let client = await arc.tables();
  let feedback = client.feedback;

  let incomingString = req.body;
  let postData = incomingString;
  if (typeof req.body === "string") {
    postData = JSON.parse(incomingString);
  }

  try {
    if (!postData.url) throw ReferenceError("missing url");

    let timestamp = new Date().getTime().toString();
    const myURL = new URL(postData.url);
    let site = myURL.hostname;
    let helpful_bool = true;
    if (postData.helpful === "yes") {
      helpful_bool = true;
    }
    if (postData.helpful === "no") {
      helpful_bool = false;
    }

    let insertObject = {};
    insertObject.siteDomain = site;
    insertObject.feedbackKey = `${myURL.href}-${timestamp}-${Math.random()}`;
    insertObject.time = timestamp;
    insertObject.url = myURL.href;
    insertObject.helpful = helpful_bool;
    insertObject.comments = postData.comments;

    console.log('inserting')
    console.log(insertObject);

    // store the event object in DynamoDB
    let feedbackItem = await feedback.put(insertObject);

    console.log("feedback data recorded");
    console.log(feedbackItem);

    return {
      cors: true,
      status: 201,
      json: feedbackItem,
    };
  } catch (e) {
    console.log(e);
    return {
      cors: true,
      status: 500,
      json: {
        name: e.name,
        message: e.message,
        stack: e.stack,
      },
    };
  }
}
