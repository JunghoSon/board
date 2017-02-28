import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongodb server');
});
mongoose.connect('mongodb://jhson:wjdgh0754522@ds143449.mlab.com:43449/board');

autoIncrement.initialize(db);

const Schema = mongoose.Schema;

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

Board.statics.getTotal = function(){
    return this.count({}).exec();
};

Board.statics.getList = function(obj){
    return this.find({})
               .sort({num: -1})
               .skip(obj.startBoard)
               .limit(obj.size)
               .exec((err, boards) => {
                   if(err) throw err;
                   obj.boards = boards;
                   return obj;
               });
};


Board.plugin(autoIncrement.plugin, {
    'model': 'Board',
    'field': 'num',
    'startAt': 1,
    'incrementBy': 1
});

export default mongoose.model('Board', Board);