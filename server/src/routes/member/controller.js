import Member from '../../models/Member';
import jwt from 'jsonwebtoken';

exports.register = (req, res) => {
    const { id, password, email  } = req.body;

    const create = (member) => {
        if(member){
            throw new Error('이미 존재하는 id 입니다.');
        }else{
            return Member.create(id, password, email);
        }
    };

    const respond = () => {
        res.json({
            message: '회원가입이 성공적으로 이뤄졌습니다.'
        });
    };

    const onError = (error) => {
        res.status(403).json({
            message: error.message,
            isId: true
        });
    }

    Member.findOneById(id)
          .then(create)
          .then(respond)
          .catch(onError);
};

exports.checkId = (req, res) => {
    const { id } = req.body;
    
    const respond = (member) => {
        if(member){
            throw new Error('이미 존재하는 id 입니다.');
        }else{
            res.json({
                message: '사용가능한 아이디 입니다.'
            });
        }
    };
    
    const onError = (error) => {
        res.status(403).json({
            message: error.message,
            isId: true
        });
    };
    
    Member.findOneById(id)
          .then(respond)
          .catch(onError);
};

exports.login = (req, res) => {
    const { id, password } = req.body;
    const secret = req.app.get('jwt-secret');

    const verify = (member) => {
        if(!member){
            throw new Error('login failed');
        }else{
            if(user.verify(password)){
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: member._id,
                            id: member.id
                        }, 
                        secret, 
                        {
                            expiresIn: '1d',
                            issuer: 'heyfrend',
                            subject: 'userInfo'
                        }, (token, error) => {
                            if(error) reject(error);
                            resolve(token);
                        }
                    );
                });
                
                return p;
            }else{
                throw new Error('login failed');
            }
        }
        return Member.verify(password);
    };
    
    const respond = (token) => {
        return res.json({
            message: '로그인 성공',
            token
        });
    };
    
    const onError = (error) => {
        return res.status(403).json({
            message: error.message
        });
    };

    Meber.findOneById(id)
         .then(verify)
         .then(respond)
         .then(onError);
};
