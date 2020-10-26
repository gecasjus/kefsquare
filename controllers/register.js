const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission')
	}
							
	const hash = bcrypt.hashSync(password); //when you have to do two or more things at once you create a transaction
		db.transaction(trx => {			//transactions if one part of the table(users) fail then the other also must fail(login). To avoid inconsistencies.
			trx.insert({				//using trx parameter instead of db to make sure whatever we do is a transaction
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')  //knex method
			.then(loginEmail => {
				return trx('users')
					.returning('*') 
					.insert({
				email: loginEmail[0], //returning an array
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]); //to make sure that it is not an array and we are returning an object [0]
			})
		})
			.then(trx.commit)		//if all these pass, send this transaction through
			.catch(trx.rollback)
	})
	.catch(err => console.log(err))
}

module.exports = {
	handleRegister: handleRegister
};