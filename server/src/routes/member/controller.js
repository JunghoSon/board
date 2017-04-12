import Member from '../../models/Member';
import jwt from 'jsonwebtoken';

exports.register = (req, res) => {
    const { id, password, email  } = req.body;

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

    Member.create(id, password, email)
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
            message: error.message
        });
    };

    Member.findOneById(id)
          .then(respond)
          .catch(onError);
};

exports.checkEmail = (req, res) => {
    const { email } = req.body;

    const respond = (email) => {
        if(email){
            throw new Error('이미 존재하는 email 입니다.');
        }else{
            res.json({
                message: '사용가능한 email 입니다.'
            });
        }
    };

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    };

    Member.findOneByEmail(email)
          .then(respond)
          .catch(onError);
};

exports.checkToken = (req, res) => {
     res.json({
         userInfo: req.decoded
     });
};

exports.login = (req, res) => {
    const { id, password } = req.body;
    const secret = req.app.get('jwt-secret');

    const verify = (member) => {
        if(!member){
            throw new Error('존재하지 않는 아이디 입니다.');
        }else{
            if(member.verify(password)){
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: member._id,
                            id: member.id
                        },
                        secret,
                        {
                            expiresIn: '1d',
                            issuer: 'heyfriend.com',
                            subject: 'userInfo'
                        }, (error, token) => {
                            if(error) reject(error);
                            resolve(token);
                        }
                    );
                });

                return p;
            }else{
                throw new Error('비밀번호가 일치하지 않습니다.');
            }
        }
    };

    const respond = (token) => {
        return res.json({
            token
        });
    };

    const onError = (error) => {
        return res.status(403).json({
            message: error.message
        });
    };

    Member.findOneById(id)
          .then(verify)
          .then(respond)
          .catch(onError);
};

exports.account = (req, res) => {
    const { id } = req.decoded;
    
    const respond = (member) => {
        res.json({
            id: member.id,
            email: member.email
        });
    };
    
    const onError = (error) => {
        return res.status(403).json({
            message: error.message
        });
    };
    
    Member.findOneById(id)
          .then(respond)
          .catch(onError);
};

exports.modify = (req, res) => {
    const { id } = req.decoded;
    const { password_old, password, email } = req.body;
    const secret = req.app.get('jwt-secret');
    
    const modify = (member) => {
        if(!member){
            throw new Error('존재하지 않는 아이디 입니다.');
        }else{
            if(member.verify(password_old)){
                return member.modify(password, email);
            }else{
                throw new Error('기존 비밀번호가 일치하지 않습니다.');
            }
        }
    };
    
    const respond = () => {
        res.json({
            message: '성공적으로 회원정보를 변경 했습니다.'
        });
    }
    
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    }
    
    Member.findOneById(id)
          .then(modify)
          .then(respond)
          .catch(onError);
};

exports.profile = (req, res) => {
    const { id } = req.decoded;
    
    const respond = (member) => {
        if(!member){
            throw new Error('존재하지 않는 아이디 입니다.');
        }else{
            let { profile } = member;
            
            res.json({
                gender: profile.gender,
                age_y: profile.age_y,
                age_m: profile.age_m,
                age_d: profile.age_d,
                nationality: profile.nationality,
                live_nationality: profile.live_nationality,
                live_city: profile.live_city,
                lang1: profile.lang1,
                lang2: profile.lang2,
                lang3: profile.lang3, 
                job: profile.job,
                purpose: profile.purpose,
                intro: profile.intro
            });
        }
    }
    
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    }
    
    Member.findOneById(id)
          .then(respond)
          .catch(onError);
};

exports.profileModify = (req, res) => {
    const { id } = req.decoded;
    const { gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro } = req.body;
    
    const modify = (member) => {
        if(!member){
            throw new Error('존재하지 않는 아이디 입니다.');
        }else{
            return member.profileModify(gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro);
        }
    }
    
    const respond = (member) => {
        res.json({
            gender: member.profile.gender,
            age_y: member.profile.age_y,
            age_m: member.profile.age_m,
            age_d: member.profile.age_d,
            nationality: member.profile.nationality,
            live_nationality: member.profile.live_nationality,
            live_city: member.profile.live_city,
            lang1: member.profile.lang1,
            lang2: member.profile.lang2,
            lang3: member.profile.lang3, 
            job: member.profile.job,
            purpose: member.profile.purpose,
            intro: member.profile.intro
        });
    }
    
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    }
    
    Member.findOneById(id)
          .then(modify)
          .then(respond)
          .catch(onError);
};
