import React, { ReactNode } from "react";
import Head from "next/head";
import "../styles/index.scss";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "Restaurant Table Organizer" }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
      <link rel="stylesheet" href="https://use.typekit.net/uwl0yqs.css" />
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>
		<main className="app">
			{children}
		</main>
	</div>
);

export default Layout;
