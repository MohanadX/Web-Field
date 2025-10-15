import { auth } from "@/auth";
import UserStartups, { StartupCardsSkeleton } from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = await (await params).id;

	const session = await auth();

	const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

	if (!user) return notFound();

	return (
		<>
			<section className="profile-container">
				<div className="profile-card bg-primary">
					<div className="profile-title">
						<h1 className="text-[24px] font-black uppercase text-center line-clamp-1">
							{user?.name}
						</h1>
					</div>

					<Image
						src={user?.image || ""}
						alt={user?.name || ""}
						height={220}
						width={220}
						className="profile-image"
					/>

					<p className="text-[30px] font-extrabold mt-7 text-center text-white">
						@{user?.username}
					</p>
					<p className="mt-1 text-center text-[14px] text-white font-normal">
						{user?.bio}
					</p>
				</div>

				<div className="flex-1 flex flex-col gap-5 lg:-mt-5">
					<p className="text-[30px] font-bold">
						{session?.id === id ? "Your" : "All"} Startups
					</p>
					<ul className="cards-grid">
						<Suspense fallback={<StartupCardsSkeleton />}>
							<UserStartups id={id} />
						</Suspense>
					</ul>
				</div>
			</section>
		</>
	);
};

export default page;
