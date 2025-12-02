import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "sonner";

const workSans = localFont({
	src: [
		{
			path: "../public/fonts/WorkSans-Black.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-ExtraBold.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-Thin.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-Light.ttf",
			weight: "200",
			style: "normal",
		},
		{
			path: "../public/fonts/WorkSans-ExtraLight.ttf",
			weight: "100",
			style: "normal",
		},
	],
	variable: "--font-work-sans",
});

const BASE_URL = process.env.AUTH_URL!;

export const metadata: Metadata = {
	title: "Web Field – Startup & Innovation Community",
	description:
		"Web Field is a community-driven platform connecting startups, developers, and innovators to share stories, showcase projects, and collaborate in the digital ecosystem.",
	keywords: [
		"startups",
		"innovation",
		"tech community",
		"Web Field",
		"developer network",
		"digital ecosystem",
		"tech collaboration",
		"product launch",
		"startup stories",
	],
	openGraph: {
		title: "Web Field – Startup & Innovation Community",
		description:
			"Web Field is a community-driven platform connecting startups, developers, and innovators to share stories, showcase projects, and collaborate in the digital ecosystem.",
		images: [`${BASE_URL}/favicon.ico`],
		siteName: "Web Field",
		url: BASE_URL,
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1,
		},
	},
	other: {
		"application/ld+json": JSON.stringify({
			"@context": "http://schema.org",
			"@type": "WebSite",
			name: "Web Field",
			url: BASE_URL,
			description:
				"A platform for startups, developers, and innovators to connect, share projects, and collaborate in the tech ecosystem.",
			publisher: {
				"@type": "Organization",
				name: "Web Field",
				logo: {
					"@type": "ImageObject",
					url: `${BASE_URL}/favicon.ico`,
				},
			},
		}),
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={workSans.variable}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
