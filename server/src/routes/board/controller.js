import Board from '../../models/Board';

exports.create = (req, res) => {
    const { title, author, content } = req.body;

    const respond = () => {
        res.json({
            success: true
        });
    };

    const onError = (err) => {
        res.status(409).json({
            success: false,
            error: err,
            message: err.message
        });
    }

    Board.create(title, author, content)
         .then(respond)
         .catch(onError);
};

exports.list = (req, res) => {
    const page = (typeof req.params.page === 'undefined') ? 1 : parseInt(req.params.page, 10);
    const query = req.query;

    let pagenation = null;

    const getPagenation = (total) => {
        pagenation = Board.getPagenation(page, total);

        return Promise.resolve(false);
    };

    const getList = () => {
        return Board.getList(query, pagenation);
    };

    const respond = (boards) => {
        res.json({
            boards: boards,
            pagenation: pagenation,
            success: true
        });
    };

    const onError = (err) => {
        res.status(409).json({
            success: false,
            error: err,
            message: err.message
        });
    };

    Board.getTotal(query)
         .then(getPagenation)
         .then(getList)
         .then(respond)
         .catch(onError);
};

exports.dummy = (req, res) => {
    for(let i=0; i<124; i++){
        let board = new Board({
            title: "dummy title no " + i,
            content: "dummy content no " + i,
            author: "dummy author no " + i
        });

        board.save((err, dummys) => {
            if(err) throw err;
        });
    }
};
