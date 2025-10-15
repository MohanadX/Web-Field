import { ReactNode, Suspense } from "react";
import Navbar from "../../components/Navbar";
import { Loader } from "@/components/Loader";

export default function Layout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<main className="font-work-sans">
			<Suspense fallback={<Loader type="navbar" />}>
				<Navbar />
			</Suspense>
			<Suspense fallback={<Loader />}>{children}</Suspense>
		</main>
	);
}
