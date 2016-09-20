const express = require('express');
const bodyParser = require('body-parser');
const ethAddr = require('ethereum-address');
const axios = require('axios');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	if (typeof req.query.address !== 'undefined') {
		getBalance(req.query.address)
			.then((balance) => {
				res.render('index', {
						balance: balance,
						address: req.query.address
					}
				);
			})
			.catch((err) => {
				res.render('index', {
						error: err,
						address: req.query.address
					}
				);
			});
	} else {
		res.render('index');
	}
});


var getBalance = async ((address) => {
	if (!ethAddr.isAddress(address)) {
		throw "Error: Address is not valid";
	}

	let {data} = await (axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`));

	if (typeof data.balance !== 'undefined') {
		return data.balance / 1000000000000000000;
	} else {
		throw "Error: No balance received";
	}

});

const server = app.listen(3000, () => {
	let {address, port} = server.address();
	console.log(`Test listening on http://${address}:${port}`);
});