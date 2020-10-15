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
import { faSearch, faAngleDoubleDown, faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faAngleDoubleDown, faArrowAltCircleRight, faArrowAltCircleLeft);

interface FilterList {
	genres: Array<string>;
	states: Array<string>;
	attire: Array<string>;
}

interface CurrentFilter {
	genres: string;
	states: string;
	attire: string;
	alpha: string;
}

interface Pages {
	current: number;
	total: number;
}

const IndexPage = ({ data }) => {
	// console.log("PROPS", data);
	const [restaurants, setRestaurants] = useState(data);

	const [filterList, setFilterList] = useState<FilterList>({
		genres: [""],
		states: [""],
		attire: [""],
	});

	const [filteredRestaurants, setFilteredRestaurants] = useState(data);
	const [ currentFilter, setCurrentFilter ] = useState<CurrentFilter>({
		genres: "all",
		states: "all",
		attire: "all",
		alpha: "A-Z"
	})

	const [ pages, updatePages ] = useState<Pages>({
		current: 1,
		total: 1,
	})

	const [ pageContent, setPageContent ] = useState([])

	const handleSearchQuery = (includeFilter:boolean = true, query:string) => {
		console.log(includeFilter, query)
		let result;
		// CHECKS IF 'NAME', 'CITY' OR 'GENRE' CONTAINS QUERY
		if (includeFilter) {
			result = filteredRestaurants.filter(restaurant => {
				const { name, city, genre } = restaurant

				return name.includes(query) || city.includes(query) || genre.includes(query)
			})
		} else {
			result = restaurants.filter(restaurant => {
				const { name, city, genre } = restaurant

				return name.includes(query) || city.includes(query) || genre.includes(query)
			})
		}
		console.log(result);
		setFilteredRestaurants(result)
	}

	useEffect(() => {
		console.log("restaurants was updated");

		// INITIALIZE 3 FILTER VARS TO RECEIVE AN ARRAY OF STRINGS
		let genres: string[] = [],
			states: string[] = [],
			attires: string[] = [];

		// LOOPS THROUGH THE RESTUARANTS RETURNED FROM THE API
		restaurants.map((restaurant: any) => {
			const { name, genre, city, state, attire } = restaurant;
			restaurant.name = name.toLowerCase();
			restaurant.genre = genre.toLowerCase();
			restaurant.city = city.toLowerCase();
			restaurant.state = state.toLowerCase();
			restaurant.attire = attire.toLowerCase();
			// SPLIT THE GENRES<STRING> INTO AN ARRAY OF STRINGS AND ASSIGN TO TEMP VAR 'ARR'
			let arr: string[] = restaurant.genre.split(",");
			
			restaurant.genre = arr.join(', ');
			// LOOP THROUGH 'ARR' AND PUSH TO GENRES
			arr.map((genre: string) => {
				genre = genre.replace(/\s+/g, '')
				// FIRST CHECK TO SEE IF GENRE ALREADY EXISTS IN ARR
				if (!genres.includes(genre)) {
					genres.push(genre);
				}
			});

			!states.includes(state) && states.push(state);
			!attires.includes(attire) && attires.push(attire);
		});

		setFilterList({
			genres: genres,
			states: states,
			attire: attires,
		});

		setFilteredRestaurants(() => {
			let list = []
			// set alpha
			if (currentFilter.alpha === "A-Z") {
				list = restaurants.sort((a, b) => {
					if (a.name < b.name) { return -1 }
					if (a.name  > b.name) { return 1}
					return 0;
				})
			} else if (currentFilter.alpha === "Z-A") {
				list = restaurants.sort((a, b) => {
					if (a.name > b.name) { return -1 }
					if (a.name < b.name) { return 1}
					return 0;
				})
			}
			if (currentFilter.genres !== "all") {
				list = list.filter(item => item.genre.includes(currentFilter.genres))
			}
			if (currentFilter.states !== "all") {
				list = list.filter(item => item.state.includes(currentFilter.states))
			}
			if (currentFilter.attire !== "all") {
				list = list.filter(item => item.attire.includes(currentFilter.attire))
			}		

			return list
		})

	}, [restaurants, currentFilter]);

	useEffect(() => {
		console.log("TOTAL RESTAURANTS", filteredRestaurants.length);
		let totalPages = 0
		for (let i = 0; i < filteredRestaurants.length; i++) {
			i % 10 === 0 && totalPages++;
		}
		console.log("TOTAL PAGES", totalPages);
		if (totalPages >= pages.current) {
			updatePages({
				current: pages.current,
				total: totalPages
			});
		} else (
			updatePages({
				current: 1,
				total: totalPages
			})
		)

	}, [filteredRestaurants])

	useEffect(() => {
		setPageContent(filteredRestaurants.slice((pages.current - 1) * 10, pages.current * 10))
	}, [pages])

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<Header handleSearchQuery={handleSearchQuery}/>
			<section className="app--data">
				<div className="app--controls">
					<Filter filterList={filterList} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>
					<Paginate pages={pages} updatePages={updatePages}/>
				</div>
				<div className="app--display">
				  <Table restaurants={pageContent}/>
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
