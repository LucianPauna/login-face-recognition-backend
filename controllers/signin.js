const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    db('login').select('email', 'hash').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('Unable to get user'));
            } else {
                res.status(400).json('Wrong username or password');
            }
        })
        .catch(err => res.status(400).json('Wrong username or password'));
}

export { handleSignIn };