const { User } = require('../models');

getUser = async (props) => {
    const { key, value } = props;
    if(!key || !value ){
        return { status_code: 400, json: {"message": "no params specified"} }
    }
    return await User.findOne({
        where: {
            [key]: value
        },
        attributes: {
            exclude: ['phone', 'createdAt', 'updatedAt']
        }
    })
    .then(user => {
        if(user){
            return { status_code: 200, json: user }
        }
        return { status_code: 400, json: "Usuário não encontrado." }        
    }).catch(err => {
        return {status_code: 400, json: {"message": "no params specified"}}
    });
};

exports.findUser = async (req, res) => {

    const idUser = req.params.id;
    const cpf = req.body.cpf;

    const props = {
        key: (idUser ? 'id' : 'cpf'),
        value: (idUser ? idUser : cpf)
    };

    const user = await getUser(props);

    res.status(user.status_code).json(user.json);

};