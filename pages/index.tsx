import Layout from "../components/Layout";
import Header from "../components/Header"
import { GetServerSideProps } from "next";
import fetch, {Response } from "node-fetch";
import { useEffect, useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

const IndexPage = ({data}) => {
  // console.log("PROPS", data);

  const [ restaurants, setRestaurants ] = useState(data)
	return (
		<Layout title="Home | Next.js + TypeScript Example">
      <Header />
			<h1>Hello Next.js 👋</h1>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
  let headers: any = {
    Authorization: process.env.AUTH_KEY
  }
	try {
    const URL: string = process.env.ENDPOINT!;
    const result: Response = await fetch(URL, {
      headers: headers,
    });
    console.log(typeof result)
    const data: object = await result.json();
    console.log(typeof data);
    return { props: { data } };
  }
  catch {
    return { props: {} }
  }
};

export default IndexPage;
