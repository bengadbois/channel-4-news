1. [Create a Slack app](https://api.slack.com/apps)
1. Enable the Bot user, add `chat:write` and `channels:read` in Permissions>Scopes, and generate an OAuth token for it
1. [Deploy to DigitalOcean](https://cloud.digitalocean.com/apps/new?repo=https://github.com/bengadbois/channel-4-news/tree/main) using the token and signing secret from steps (1) and (2)
1. Go back to the Slack App config and click on Event Subscriptions
1. Enable and paste your app's URL in the Request URL field like so: `https://yourapp.ondigitalocean.app/slack/events`
1. Subscribe to the bot event `channel_created`
