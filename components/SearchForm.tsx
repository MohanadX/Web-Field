import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
	return (
		// Submits the form to the root route (/) but prevents the page from scrolling to the top after submit
		// which also preserve the states of the parent client components children (like SanityLive)
		<Form action="/" scroll={false} className="search-form">
			<input
				type="text"
				name="query"
				defaultValue={query}
				className="search-input"
				placeholder="Search Startups"
			/>

			<div className="flex gap-2">
				{query && <SearchFormReset />}
				<button type="submit" className="search-btn">
					<Search className="size-5 text-white" />
				</button>
			</div>
		</Form>
	);
};

export default SearchForm;
