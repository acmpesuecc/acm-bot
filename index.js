// Git Data API use case example
// See: https://developer.github.com/v3/git/ to learn more

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Opens a PR every time someone installs your app for the first time
  app.on("issues.opened", async (context) => {
      console.log("ISSUE!")
    });

  app.on("pull_request.opened", async (context) => {
      console.log("PR!")
      var sender = context.payload.sender.login
      console.log(sender)
      const params = context.issue({ body: "Hey there @"+sender+", Thanks for contributing! A maintainer will review this shortly."});

    // Post a comment on the issue
      return context.github.issues.createComment(params);
    });

  app.on("issue_comment.created", async (context) => {
      console.log("Issue Comment")
      var html_url = context.payload.issue.html_url
      console.log(html_url)
      var sender = context.payload.sender.login
      console.log(sender)
      var body = context.payload.comment.body
      console.log(body, context)
      console.log(context.payload.issue.user)

    });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
