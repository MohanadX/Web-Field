import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "sonner";

const workSans = localFont({
	src: [
		{
			path: "/fonts/WorkSans-Black.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-ExtraBold.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-Thin.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-Light.ttf",
			weight: "200",
			style: "normal",
		},
		{
			path: "/fonts/WorkSans-ExtraLight.ttf",
			weight: "100",
			style: "normal",
		},
	],
	variable: "--font-work-sans",
});

export const metadata: Metadata = {
	title: "Web Field",
	description: `Web Field is a community-driven platform that connects and empowers startups to share their stories,
	showcase innovations, and collaborate with others in the digital ecosystem. Whether you're a founder launching a new product or a developer seeking inspiration, Web Field gives you the space to publish posts,
	explore ideas, and discover growing companies shaping the future of tech.`,
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
