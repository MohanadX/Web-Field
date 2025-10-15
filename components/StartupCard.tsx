import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupCardType = Omit<Startup, "author"> & { author: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
	const {
		_createdAt,
		views,
		author: { _id: authorId, name, image: authorImg },
		_id,
		description,
		image,
		category,
		title,
	} = post;
	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup_card_date">{formatDate(_createdAt)}</p>
				<div className="flex gap-1.5">
					<EyeIcon className="size-6 text-[#ee2b69]" />
					<span className="font-medium">{views}</span>
				</div>
			</div>
			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${authorId}`}>
						<p className="font-medium line-clamp-1">{name}</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className="text-[26px] font-semibold line-clamp-1">{title}</h3>
					</Link>
				</div>
				<Link href={`/user/${authorId}`}>
					<Image
						src={authorImg!}
						alt="placeholder"
						width={48}
						height={48}
						className="rounded-full"
					/>
				</Link>
			</div>
			<Link href={`/startup/${_id}`}>
				<p className="startup-card-des">{description}</p>
				<Image
					src={image!}
					alt="placeholder"
					width={200}
					height={200}
					className="startup-card-img"
				></Image>
			</Link>
			<div className="flex-between gap-3 mt-5">
				<Link href={`/?query=${category?.toLowerCase()}`}>
					<p className="text-[16px] font-medium">{category}</p>
				</Link>
				<Button className="startup-card-btn" asChild>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export default StartupCard;
