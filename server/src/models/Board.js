import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(mongoose.connection);

const Board = new Schema({
    title: String,
    author: String,
    content: String,
    comments: [
        {
            content: String,
            author: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

Board.statics.create = function(title, author, content){
    const board = new this({
        title,
        author,
        content
    });

    return board.save();
};

Board.statics.getTotal = function(query){
    return this.count(query).exec();
};

Board.statics.getList = function(query, pagenation){
    return this.find(query)
               .sort('-num')
               .skip(pagenation.startBoard)
               .limit(pagenation.size)
               .exec();
};

Board.statics.getPagenation = function(page, total){
    const size = 10;
    const pageSize = 5;

    page = parseInt(page, 10);

    let pagenation = {};
    let startBoard = (page - 1) * size;
    let totalPage = Math.ceil(total / size);
    let startPage = (Math.floor((page - 1) / pageSize) * pageSize) + 1;
    let endPage = startPage + (pageSize - 1);

    if(endPage > totalPage) endPage = totalPage;

    let prevPage = (page < pageSize) ? -1 : startPage - pageSize;
    let nextPage = (endPage === totalPage) ? -1 : endPage + 1;

    pagenation.page = page;
    pagenation.startBoard = startBoard;
    pagenation.startPage = startPage;
    pagenation.endPage = endPage;
    pagenation.prevPage = prevPage;
    pagenation.nextPage = nextPage;
    pagenation.size = size;

    return pagenation;
};

Board.plugin(autoIncrement.plugin, {
    'model': 'Board',
    'field': 'num',
    'startAt': 1,
    'incrementBy': 1
});

export default mongoose.model('Board', Board);
