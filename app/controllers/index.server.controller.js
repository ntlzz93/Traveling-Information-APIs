exports.render = function(req, res) {
    res.render('index', {
    	title: 'Traveling Information Apis',
    	user: req.user ? req.user.FirstName : ''
    });
};