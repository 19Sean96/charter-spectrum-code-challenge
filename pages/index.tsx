import Layout from "../components/Layout";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Paginate from "../components/Paginate";
import Table from "../components/Table";
import { GetServerSideProps } from "next";
import fetch, { Response } from "node-fetch";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
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


const IndexPage = (props:any) => {
	// data from API
	const { data } = props;

	// raw restaurant data
	const [restaurants, setRestaurants] = useState(data);

	// updated restaurant data with filters applied
	const [filteredRestaurants, setFilteredRestaurants] = useState(data);

	// data for filter form
	const [filterList, setFilterList] = useState<FilterList>({
		genres: [""],
		states: [""],
		attire: [""],
	});

	// current filters being applied to filteredRestaurants hook
	const [ currentFilter, setCurrentFilter ] = useState<CurrentFilter>({
		genres: "all",
		states: "all",
		attire: "all",
		alpha: "A-Z"
	})

	// current/total page data - updated based on filteredRestaurants.length
	const [ pages, updatePages ] = useState<Pages>({
		current: 1,
		total: 1,
	})

	// current page data to serve
	const [ pageContent, setPageContent ] = useState([])


	// function for handling query from SearchBox.tsx
	const handleSearchQuery = (includeFilter:boolean = true, query:string) => {

		let result;

		// CHECKS IF 'NAME', 'CITY' OR 'GENRE' CONTAINS QUERY
		// apply filters
		if (query.length == 0) {
			result = restaurants
		} else {
			if (includeFilter) {
				result = filteredRestaurants.filter((restaurant:any) => {
					const { name, city, genre } = restaurant
	
					return name.includes(query) || city.includes(query) || genre.includes(query)
				})
			} 
			// do not apply filters
			else {
				result = restaurants.filter((restaurant:any) => {
					const { name, city, genre } = restaurant
	
					return name.includes(query) || city.includes(query) || genre.includes(query)
				})
			}
		}

		
		setFilteredRestaurants(result)
	}

	// init effect - fallback if data is null at start
	useEffect(() => {
		setRestaurants(data)
	}, [])

	useEffect(() => {

		// INITIALIZE 3 FILTER VARS TO RECEIVE AN ARRAY OF STRINGS
		let genres: string[] = [],
			states: string[] = [],
			attires: string[] = [];

			// check if restaurants exists first
		if (restaurants) {

			restaurants.map((restaurant: any) => {
				const { name, genre, city, state, attire } = restaurant;
				
				// switch strings to lowercase for data processing
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
					list = restaurants.sort((a:any, b:any) => {
						if (a.name < b.name) { return -1 }
						if (a.name  > b.name) { return 1}
						return 0;
					})
				} else if (currentFilter.alpha === "Z-A") {
					list = restaurants.sort((a:any, b:any) => {
						if (a.name > b.name) { return -1 }
						if (a.name < b.name) { return 1}
						return 0;
					})
				}
				if (currentFilter.genres !== "all") {
					list = list.filter((item:any) => item.genre.includes(currentFilter.genres))
				}
				if (currentFilter.states !== "all") {
					list = list.filter((item:any) => item.state.includes(currentFilter.states))
				}
				if (currentFilter.attire !== "all") {
					list = list.filter((item:any) => item.attire.includes(currentFilter.attire))
				}		
	
				return list
			})
		}



	}, [restaurants, currentFilter]);

	// update pages hook when filteredRestaurants is updated - meaning a new filter has been applied
	useEffect(() => {
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

	// when pages changes (such as changing from page 1 to 2 ) reassess page contents
	useEffect(() => {
		setPageContent(filteredRestaurants.slice((pages.current - 1) * 10, pages.current * 10))
	}, [pages])

	return (
		<Layout title="Home | Code Challenge | Restaurant Table">
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

// GET DATA
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
