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
    const { page } = req.params.page;
    
    const count = () => {
        return Board.count({}).exec();
    };
    
    const getPagenation = (total) => {
        let targetPage = page;
        targetPage = (typeof targetPage === 'undefined') ? 0 : parseInt(targetPage, 10);
        
        let pObj = {};
        let size = 10;
        let pageSize = 5;
        
        console.log(targetPage);
        
        let startBoard = (targetPage - 1) * size;
        let totalPage = Math.ceil(total / size);
        let startPage = (Math.floor((targetPage - 1) / pageSize) * pageSize) + 1;
        let endPage = startPage + (pageSize - 1);
        
        if(endPage > totalPage) endPage = totalPage;
        
        let prevPage = (targetPage < pageSize) ? -1 : startPage - pageSize;
        let nextPage = (endPage === totalPage) ? -1 : endPage + 1;
        
        pObj.targetPage = targetPage;
        pObj.startBoard = startBoard;
        pObj.startPage = startPage;
        pObj.endPage = endPage;
        pObj.prevPage = prevPage;
        pObj.nextPage = nextPage;
        pObj.size = size;
        
        return {
            pagenation: pObj
        };
    };
    
    const getList = (obj) => {
        return Board.getList(obj);
    };
    
    const respond = (obj) => {
        obj.success = true;
        res.json(obj);
    };
    
    const onError = (err) => {
        res.status(409).json({
            success: false,
            error: err,
            message: err.message
        });
    };
    
    Board.getTotal()
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
        
        board.save();
    }
};