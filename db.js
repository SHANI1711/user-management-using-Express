const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;

mongoose
	.connect(connectionString)
	.then(() => {
		console.log('Connection successfull!!');
	})
	.catch((error) => {
		console.log(error);
	});

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		requir: true,
	},
	firstName: {
		type: String,
		requir: true,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
