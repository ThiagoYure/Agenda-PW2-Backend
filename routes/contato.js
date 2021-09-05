// Definição dos esquemas a serem usados pela documentação Swagger.
/**
 * @swagger
 * components:
 *   schemas:
 *     NovoContato:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do contato.
 *           example: Paulo Ewerton
 *         telefone:
 *           type: string
 *           description: Telefone do contato.
 *           example: (83) 98888-0101
 *     Contato:
 *       allOf:
 *         - $ref: '#/components/schemas/NovoContato'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID do contato.
 *               example: 0
 *             createdAt:
 *               type: string
 *               description: Data no formato ISO em que o contato foi registrado.
 *               example: 2021-07-08T18:08:19.965Z
 *             updatedAt:
 *               type: string
 *               description: >
 *                 Data no formato ISO em que o contato foi atualizado pela última vez.
 *               example: 2021-07-08T18:08:19.965Z
 */

const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');

// Importa o controller
const contatoController = require('../controllers/contatoController');


/**
 * @swagger
 * /contato/{iduser}:
 *   get:
 *     summary: Recupera a lista de contatos do usuario.
 *     description: Recupera a lista de contatos da agenda. Pode ser usado sem autenticação.
 *     responses:
 *       200:
 *         description: Uma lista de contatos.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 contatos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contato'
*/
router.get('/:iduser', verify, contatoController.contatosList);

/**
 * @swagger
 * /contato/detalhes/{id}:
 *   get:
 *     summary: Recupera um único contato.
 *     description: Recupera um único contato da agenda pelo ID. Pode ser usado sem autenticação.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do contato a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Um único contato.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 contato:
 *                   $ref: '#/components/schemas/Contato'
*/
router.get('/detalhes/:id', verify, contatoController.contatosRead);

/**
 * @swagger
 * /contato:
 *   post:
 *     summary: Cria um novo contato.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoContato'
 *     responses:
 *       201:
 *         description: Contato criado
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 contato:
 *                   $ref: '#/components/schemas/Contato'
*/
router.post('/', verify, contatoController.contatosCreate);

/**
 * @swagger
 * /contato/{id}:
 *   patch:
 *     summary: Atualiza um contato.
 *     description: Modifica os valores de um contato já armazenado na agenda, recuperado pelo ID.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoContato'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do contato a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contato atualizado.
*/
router.patch('/:id', verify, contatoController.contatosUpdate);

/**
 * @swagger
 * /contato/{id}:
 *   delete:
 *     summary: Apaga um contato.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do contato a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contato apgado.
*/
router.delete('/:id', verify, contatoController.contatosDelete);

module.exports = router;
