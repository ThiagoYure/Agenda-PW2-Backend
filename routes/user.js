// Definição dos esquemas a serem usados pela documentação Swagger.
/**
 * @swagger
 * components:
 *   schemas:
 *     NovoUsuario:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nome do usuário.
 *           example: Thiago Yure
 *         email:
 *           type: string
 *           description: Email do usuário.
 *           example: thigoyure@gmail.com
 *         password:
 *           type: string
 *           description: Senha do usuário.
 *           example: 123456
 *         confirmado:
 *           type: boolean
 *           description: Confirmação do email.
 *           example: true
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário.
 *           example: thigoyure@gmail.com
 *         password:
 *           type: string
 *           description: Senha do usuário.
 *           example: 123456
 */

const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');

// Importa o controller
const userController = require('../controllers/userController');

router.post('/register', userController.userCreate);
router.post('/login', userController.userLogin);
router.get('/:id', verify, userController.userRead)
router.patch('/:id', verify, userController.userEdit);
router.delete('/:id', verify, userController.userDelete);
/**
 * @swagger
 * /emailcheck/{token}:
 *   get:
 *     summary: Confirmar o email do usuário.
 *     description: Confirma a criação da conta do usuário através da confirmação do email.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token JWT enviado pelo servidor e único para o usuário.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmado.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                  message:
 *                      type: string
 *                      description: Mensagem de retorno.
 *                      example: Email confirmado
 *       500:
 *         description: Token expirado.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                  message:
 *                      type: string
 *                      description: Mensagem de retorno.
 *                      example: jwt expired
*/
router.get('/emailcheck/:token', userController.userEmailCheck);


module.exports = router;
