// Git Data API use case example
// See: https://developer.github.com/v3/git/ to learn more
const MongoClient = require("mongodb").MongoClient;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const uri =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.uy3bn.mongodb.net/Hacktoberfest2020?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = (app) => {
  // Opens a PR every time someone installs your app for the first time
  app.on("issues.opened", async (context) => {
    console.log("ISSUE!");
  });

  app.on("pull_request.opened", async (context) => {
    console.log("PR!");
    var sender = context.payload.sender.login;
    console.log(sender);
    const params = context.issue({
      body:
        "Hey there @" +
        sender +
        ", Thanks for contributing! A maintainer will review this shortly.",
    });

    // Post a comment on the issue
    return context.github.issues.createComment(params);
  });

  app.on("issue_comment.created", async (context) => {
    console.log("Issue Comment");
    var html_url = context.payload.issue.html_url;
    var sender = context.payload.sender.login;
    var body = context.payload.comment.body;
    var contributor = context.payload.issue.user.login;
    var author_association = context.payload.comment.author_association;
    var bounty = 0;
    var timestamp = context.payload.comment.created_at;
    console.log(body);
    if (body[0] == "!") {
      var res = body.split(" ");
      if (res[0] == "!bounty") {
        let maintainer = ["NavinShrinivas"];
        console.log(maintainer);
        if (maintainer.includes(sender)) {
          bounty = res[1];
          console.log("helo");
          console.log(contributor, bounty);
          /*TODO Insert Database Call*/
          try {
            await client.connect();
            const collection = client
              .db("Hacktoberfest2020", { returnNonCachedInstance: true })
              .collection("BountyData");
            // perform actions on the collection object
            r = await collection.updateOne(
              { html_url: html_url },
              {
                $set: {
                  contributor: contributor,
                  maintainer: sender,
                  points: bounty,
                  timestamp: timestamp,
                },
              },
              { upsert: true }
            );
          } finally {
            await client.close();
          }

          const params = context.issue({
            body:
              "Congrats @" + contributor + ", you got " + bounty + " points!",
          });
          return context.github.issues.createComment(params);
        }
      }
    }
    console.log(html_url);
    console.log(sender);
    //console.log(body, context)
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
