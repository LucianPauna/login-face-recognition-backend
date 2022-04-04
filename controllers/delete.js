const handleDelete = (req, res, db) => {
    const { email } = req.body;
    return db.del('*').from('users').where('email', '=', email)
        .then(user => {
            return db.del('*').from('login').where('email', '=', email);
        })
        .then(user => {
            res.json('success');
        })
        .catch(err => res.status(400).json('Unable to delete user'));
}

export { handleDelete };