import Member from '../../models/Member';

exports.register = (req, res) => {
    const { id, email, password } = req.body;

    const create = (member) => {
        if(member){
            throw new Error('이미 존재하는 id 입니다.');
        }else{
            return Member.create(id, email, password);
        }
    };

    const respond = () => {
        res.json({
            message: '회원가입이 성공적으로 이뤄졌습니다.'
        });
    };

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    }

    Member.findOneById(id)
          .then(create)
          .then(respond)
          .catch(onError);
};

exports.login = (req, res) => {
    const { id, password } = req.body;
    const secret = req.app.get('jwt-secret');

    const verify = () => {
        return Member.verify(password);
    };

    Meber.findOneById(id)
         .then(verify)
         .then()
         .then(onError);
};
