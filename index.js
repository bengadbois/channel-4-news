const channel = process.env.SLACK_CHANNEL;
const token = process.env.SLACK_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

if (!channel) {
	console.error('Set the channel using the SLACK_CHANNEL env var');
	process.exit(1);
}

if (!token) {
	console.error('Set the token using the SLACK_TOKEN env var');
	process.exit(1);
}

if (!signingSecret) {
	console.error('Set the signing secret using the SLACK_SIGNING_SECRET env var');
	process.exit(1);
}

const { App } = require('@slack/bolt');
const app = new App({
	token,
	signingSecret,
});

(async () => {
	await app.start(process.env.PORT || 3000);
	console.log(`connected, listening on port ${process.env.PORT || 3000}`);

	app.event('channel_created', async ({ event, context}) => {
		try {
			let d = new Date(0)
			d.setUTCSeconds(event.channel.created)
			let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
			let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
			let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
			let createTime = `${da} ${mo}, ${ye}`

			let text = `<#` + event.channel.id + `|` + event.channel.name + `> was created at ` + createTime
				let result = await app.client.chat.postMessage({
					token,
					channel,
					text,
					mrkdwn: true,
				})
			console.log(event.subtype, event.channel)
		} catch (error) {
			console.error(error)
		}
	});
})();
