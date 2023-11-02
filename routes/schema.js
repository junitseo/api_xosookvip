const authorize = require('../middleware/authorize');
const Role = require('../helpers/role');
const permissionFieldName = require('../helpers/permissionFieldName')
const permissionFunction = require('../helpers/permissionFunction')
const express = require('express');
const router = express.Router();
const {
    getAll,
    create,
    edit,
    search,
    remove,
    getById
} = require('../controllers/schema.js');

/**
 * @swagger
 *  components:
 *   schemas:
 *     Schema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example : "5eb12e197e06a76ccdefc121"
 *           description: The Auto-generated id of a schema
 *         dp_name:
 *           type: string
 *           description: name
 *         schema_type:
 *           type: string
 *           description: type
 *         schema_script:
 *           type: string
 *           description: script
 *         post_id:
 *           type: array
 *           description: post id
 *         createdAt:
 *           type: date
 *           description: thời gian tạo
 *         updatedAt:
 *           type: date
 *           description: thời gian update
 *       example:
 *           
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid, or the user does not have access to perform the action
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Unauthorized"
 *     NotFoundError:
 *       description: Not Found
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 message:
 *                   type: string
 *                   example: "Not Found"
 */

/**
 * @swagger
 *  tags:
 *    name: Schemas
 *    description: Schema
 */

/**
 * @swagger
 * /api/schemas:
 *   get:
 *     summary: Returns all Schemas
 *     tags: [Schemas]
 *     responses:
 *      200:
 *         description: the list of the Schemas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schemas'
 * 
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 * 
 */

router.get('/', getAll);

/**
 * @swagger
 * /api/schemas/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      description: schema id
 *      required: true
 *      example: "5eb12e197e06a76ccdefc121"
 *      schema:
 *        type: string
 *   get:
 *     summary: Returns a schema
 *     tags: [Schemas]
 *     responses:
 *       200:
 *         description: get by id of the schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Schemas'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/schemas/schema/search?q={name}:
 *   parameters:
 *    - in: path
 *      name: name
 *      description: query
 *      required: true
 *      example: "798bet"
 *      schema:
 *        type: string
 *   get:
 *     summary: Returns a Schema
 *     tags: [Schemas]
 *     responses:
 *       200:
 *         description: get by id of the Schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Schemas'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get('/schema/search', search);

/**
 * @swagger
 * /api/schemas:
 *   post:
 *     summary: Returns a new schema
 *     tags: [Schemas]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                schema_type:
 *                  type: string
 *                  example: "jason"
 *                schema_script:
 *                  type: string
 *                  example: "áassas"
 *                post_id:
 *                  type: string
 *                  example: "áassas,11311313"
 *     responses:
 *       200:
 *         description: success new schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Schemas'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.post('/', authorize(permissionFunction.SCHEMA, permissionFieldName.ADD), create)

/**
 * @swagger
 * /api/schemas/{id}:
 *   put:
 *     summary: Returns a edit schema
 *     tags: [Schemas]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                schema_type:
 *                  type: string
 *                  example: "jason"
 *                schema_script:
 *                  type: string
 *                  example: "áassas"
 *                post_id:
 *                  type: string
 *                  example: "áassas,11311313"
 *     responses:
 *       200:
 *         description: success edit schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Schemas'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.put('/:id', authorize(permissionFunction.SCHEMA, permissionFieldName.EDIT), edit)
/**
 * @swagger
 * /api/schemas/remove/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      description: schema id
 *      required: true
 *      example: "5eb12e197e06a76ccdefc121"
 *      schema:
 *        type: string
 *   delete:
 *     summary: 
 *     tags: [Schemas]
 *     security:
 *        - bearerAuth: [Admin, Editor]
 *     responses:
 *       200:
 *         description: successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Schemas'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/remove/:id', authorize(permissionFunction.SCHEMA, permissionFieldName.DELETE), remove);
module.exports = router;