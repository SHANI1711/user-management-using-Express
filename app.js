const express = require('express');
const app = express();
const { User } = require('./db');
const port = process.env.PORT || 5001;
app.use(express.json());

app.get('/users', (req, res) => {
	const getUsers = async () => {
		const user = await User.find();
		res.status(200).json({
			message: 'Successfull!!',
			success: true,
			user: user,
		});
	};
	getUsers();
});

app.post('/add', (req, res) => {
	const email = req.body.email;
	const firstName = req.body.firstName;
	if (firstName === undefined && email === undefined) {
		res.status(400).json({
			message: 'First name and email are not defined!!',
			success: false,
		});
	} else if (firstName === undefined) {
		res.status(400).json({
			message: 'First name is not defined!!',
			success: false,
		});
	} else if (email === undefined) {
		res.status(400).json({
			message: 'User email is not defined!!',
			success: false,
		});
	} else {
		const addUser = async () => {
			const user = await User.create({
				email,
				firstName,
			});
			res.status(200).json({
				message: 'User added successfully!!',
				success: true,
				user,
			});
		};
		addUser();
	}
});

app.get('/user/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findById(id);

		res.status(200).json({
			message: 'User found with given ID.',
			success: true,
			user,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: `No user found with ID : ${id}`,
		});
	}
});

app.put('/update/:id', async (req, res) => {
	const id = req.params.id;
	const email = req.body.email;
	const firstName = req.body.firstName;

	try {
		const currentUserData = await User.findById(id);

		const user = await User.findByIdAndUpdate(
			id,
			{
				email: email ? email : currentUserData.email,
				firstName: firstName ? firstName : currentUserData.firstName,
			},
			{
				new: true,
			}
		);
		res.status(200).json({
			message: 'User updated',
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			message: `No user found with ID : ${id}`,
			success: false,
		});
	}
});

app.delete('/delete/:id', (req, res) => {
	const id = req.params.id;

	const deleteUserById = async () => {
		const data = await User.findByIdAndRemove({ _id: id });
		if (data !== undefined) {
			res.status(200).json({
				success: true,
				message: 'User deleted',
			});
		} else {
			res.status(400).json({
				success: false,
				user: 'No user found!!',
			});
		}
	};
	deleteUserById().catch((err) => {
		console.log(err);
	});
});
app.listen(port, () => {
	console.log(`app is running on port: ${port}`);
});
