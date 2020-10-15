import Layout from "../components/Layout";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Paginate from "../components/Paginate";
import Table from "../components/Table";
import { GetServerSideProps } from "next";
import fetch, { Response } from "node-fetch";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

interface FilterList {
	genres: Array<string>;
	states: Array<string>;
	attire: Array<string>;
}

const IndexPage = ({ data }) => {
	// console.log("PROPS", data);
	const [restaurants, setRestaurants] = useState(data);

	const [filterList, setFilterList] = useState<FilterList>({
		genres: [""],
		states: [""],
		attire: [""],
	});

	useEffect(() => {
		console.log("restaurants was updated");

		// INITIALIZE 3 FILTER VARS TO RECEIVE AN ARRAY OF STRINGS
		let genres: string[] = [],
			states: string[] = [],
			attires: string[] = [];

		// LOOPS THROUGH THE RESTUARANTS RETURNED FROM THE API
		restaurants.map((restaurant: any) => {
			const { genre, state, attire } = restaurant;

			// SPLIT THE GENRES<STRING> INTO AN ARRAY OF STRINGS AND ASSIGN TO TEMP VAR 'ARR'
			let arr: string[] = genre.split(",");

			// LOOP THROUGH 'ARR' AND PUSH TO GENRES
			arr.map((genre: string) => {
				// FIRST CHECK TO SEE IF GENRE ALREADY EXISTS IN ARR
				if (!genres.includes(genre)) {
					genres.push(genre);
				}
			});

			!states.includes(state) && states.push(state);
			!attires.includes(attire) && attires.push(attire);
		});

		// UPDATE 'FILTER LIST' WITH ORGANIZED FILTER DATA
		setFilterList({
			genres,
			states,
			attire: attires,
		});
	}, [restaurants]);

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<Header />
			<section className="app--data">
				<div className="app--controls">
					<Filter filterList={filterList} />
					<Paginate />
				</div>
				<div className="app--display">
				  <Table restaurants={restaurants}/>
				</div>
			</section>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	let headers: any = {
		Authorization: process.env.AUTH_KEY,
	};
	try {
		const URL: string = process.env.ENDPOINT!;
		const result: Response = await fetch(URL, {
			headers: headers,
		});
		const data: object = await result.json();
		return { props: { data } };
	} catch {
		return { props: {} };
	}
};

export default IndexPage;
