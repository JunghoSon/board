import Board from '../../models/Board';

exports.create = (req, res) => {
    const { author, title, content } = req.body;

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

    Board.create(author, title, content)
         .then(respond)
         .catch(onError);
};

exports.list = (req, res) => {
    const page = (req.params.page === 'undefined') ? 1 : parseInt(req.params.page, 10);
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

exports.detail = (req, res) => {
    let id = req.params.id;

    Board.findById(req.params.id, (err, board) => {
        if(!board){
            return res.status(404).json({
                message: 'NO RESOURCE'
            });
        }

        res.json({
            success: true,
            board: board
        });
    });
}
