"use client";
import Link from "next/link";
import { Button } from "./ui/button";

const SearchFormReset = () => {
	const reset = () => {
		const form = document.querySelector<HTMLFormElement>(".search-form");
		if (form) form.reset();
	};
	return (
		<Button type="reset" onClick={reset} asChild className="bg-black">
			<Link href="/" className="search-btn text-white" scroll={false}>
				X
			</Link>
		</Button>
	);
};

export default SearchFormReset;
