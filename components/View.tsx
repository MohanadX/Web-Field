import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Startup } from "@/sanity/types";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
	const { views: totallyViews } = await client
		.withConfig({ useCdn: false })
		.fetch<Pick<Startup, "views">>(STARTUP_VIEWS_QUERY, { id });
	// Pick<Startup, "views"> tells TypeScript: “I only care about the views property from the Startup type.”

	after(async () => {
		await writeClient
			.patch(id)
			.set({ views: totallyViews! + 1 })
			.commit();
	});
	// after the component is ready then increase the views
	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>
			<p className="view-text">
				<span className="font-black">Views: {totallyViews || 1}</span>
			</p>
		</div>
	);
};

export default View;
