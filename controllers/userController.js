const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
var dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.API_KEY);

// Cadastrar usuário
exports.userCreate = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  if (user != null) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = Object.assign({}, req.body);
  newUser.password = hashedPassword;

  try {
    user = await User.create(newUser);
    res.json({ usuario: user.id });
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: 86400 // expira em 24h
    });
    const msg = {
      to: newUser.email,
      from: 'thigoyure@gmail.com',
      subject: 'Confirmação de Email',
      content: [{
        type: 'text/html',
        value: `<!DOCTYPE html>
        <html>
        <body>
        
        <h1>HTML Links</h1>
        
        <p><a href="https://agenda-pw2-backend.herokuapp.com/user/emailcheck/token=` + token + `">Validar email!</a></p>
        
        </body>
        </html>`
      }],
    };
    sgMail
      .send(msg)
      .then(() => { }, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });
  } catch (err) {
    res.json({ message: err.message });
  }
};

//Detalhar um User
exports.userRead = async(req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json({ user: user });
  } catch(err) {
    res.send({ message: err.message });
  }
};

// Fazer login
exports.userLogin = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  const message = 'E-mail ou senha inválidos.';
  if (user == null) {
    return res.status(400).json({ message: message });
  }
  if (user.confirmado == false) {
    return res.status(400).json({ message: 'Email ainda não foi confirmado' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: message });
  }

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header('Auth-Token', token).json({ token: token });
};

//Editar Usuario
exports.userEdit = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        id: req.body.id
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  if (user == null) {
    return res.status(400).json({ message: 'Usuário não cadastrado.' });
  }

  const newUser = Object.assign({}, req.body);

  try {
    const userResponse = await User.update(newUser, {
      where: {
        id: newUser.id
      }
    });
    res.status(200).json({message: "Usuário editado com sucesso!!"});
  } catch (err) {
    res.json({ message: err.message });
  }
};


//Apagar o usuario
exports.userDelete = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
          id: req.params.id
      }
    });
    res.status(204).send();
  } catch(err) {
    res.send({ message: err.message });
  }
};

//Confirmação de Email
exports.userEmailCheck = async (req, res) => {
  const token = req.params.token.split("=");
  console.log(token[1]);
  jwt.verify(token[1], process.env.TOKEN_SECRET, async function(err, decoded) {
    if (err) return res.status(500).json({message: err.message });
    
    // se tudo estiver ok, salva no request para uso posterior
    try {
      const user = await User.update({confirmado:true}, {
        where: {
          id: decoded.id
        }
      });
      res.status(200).json({message: "Email confirmado com sucesso!!"});
    } catch (err) {
      res.json({ message: err.message });
    }
  });
  /*const verified = jwt.verify(token[1], process.env.TOKEN_SECRET);
  console.log(verified);
  try {
    const user = await User.update({confirmado:true}, {
      where: {
        id: verified.id
      }
    });
    res.status(200).send();
  } catch (err) {
    res.json({ message: err.message });
  }*/
};
