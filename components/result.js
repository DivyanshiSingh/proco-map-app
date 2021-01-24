import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import Button from 'react-bootstrap/Button';

export default function Result(props) {
	let msg = '';
	switch(props.correctAnswers){
		case 5:
			msg = '🏆 You are a mapping champion! 🗺';
			break;
	}

	const [score, updateScore] = useState(props.userStats.total - 10);

	useEffect(() => {
		const interval = setInterval(() => {
			updateScore(oldValue => {
				if (oldValue < props.userStats.total) {
					const newValue = oldValue + 1;
					return newValue;
				}
				return oldValue;
			});
		}, 50);
	}, []);

	return(
	  	<Layout className="result">
			<Head>
				<title>Project Connect</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css2?family=Cabin&display=swap" rel="stylesheet" />
			</Head>

			<header className="masthead p-3">
			    <div className="inner">
			      <p className="masthead-brand">PROJECT CONNECT</p>
			    </div>
			</header>

			<div className="result big-button">
				<h1>Thank you for contributing to Project Connect! You have helped us connect {props.userStats.total} schools to the internet!</h1>
				<h1>{score}</h1>
				<p style={{paddingTop: '.5em'}}>
					{props.taggedAllLocations ? '🏆 You are a mapping champion! 🗺 You have mapped all of our potential school locations. We will add more shortly, so come back soon.' : ''}
				</p>
				<p style={{paddingTop: '.5em'}}>
					Make sure to follow <a href="https://twitter.com/procoworld" target="_blank">
				    @ProCoWorld</a> and <a href="https://twitter.com/gigaconnect" target="_blank">
					@GigaConnect</a> for the latest news,
					and look for the launch of our new mapping platform, coming soon in 2020!</p>
				<p>See how many schools we have mapped so far:</p>
				<Button variant="primary" href="https://projectconnect.world">Visit Project Connect</Button>
				<p>&nbsp;</p>
				{props.taggedAllLocations ? '' : <Button variant="primary" href="/">Map More Schools</Button>}

			</div>

	    </Layout>
  	)
}

Result.propTypes = {
  correctAnswers: PropTypes.number.isRequired
};
