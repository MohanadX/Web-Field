import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
	const session = await auth();

	if (!session) {
		redirect("/");
	}
	return (
		<>
			<section className="pink-container !min-h-[230px] bg-primary pattern">
				<h1 className="heading">Submit Your Startup Pitch</h1>
			</section>

			<StartupForm />
		</>
	);
};

export default page;
