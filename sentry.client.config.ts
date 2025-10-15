import * as Sentry from "@sentry/nextjs";
Sentry.init({
	dsn: "https://78a6c398297344bff4a4ef5441c7eb6c@o4510193265410048.ingest.de.sentry.io/4510193277730896",
	integrations: [
		Sentry.replayIntegration(),
		Sentry.feedbackIntegration({
			// Additional SDK configuration goes in here, for example:
			colorScheme: "system",
		}),
	],
});
