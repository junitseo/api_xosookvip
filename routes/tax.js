const router = require('express').Router()
const taxController = require('../controllers/taxonomy')
const authorize = require('../middleware/authorize');
const {
    list,
    create,
    read,
    updateTaxonomy,
    remove,
    descendants,
    removeTax,
    search,
    getByType
} = require('../controllers/taxonomy.js');
const permissionFieldName = require('../helpers/permissionFieldName')
const permissionFunction = require('../helpers/permissionFunction')


router.get('/:slug', taxController.getTaxBySlug)
/**
 * @swagger
 *  components:
 *   schemas:
 *     Taxonomy:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example : "5eb12e197e06a76ccdefc121"
 *           description: The Auto-generated id of a schema
 *         tax_name:
 *           type: string
 *           description: name
 *         tax_type:
 *           type: string
 *           description: type
 *         tax_description:
 *           type: string
 *           description: description
 *         tax_slug:
 *           type: string
 *           description: slug
 *         tax_parent:
 *           type: objectId
 *           description: danh mục cha
 *         tax_ancestors:
 *           type: array
 *           description: ancestors
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
 *    name: Taxonomy
 *    description: Taxonomy
 */

/**
 * @swagger
 * /api/taxonomy:
 *   get:
 *     summary: Returns all Taxonomy
 *     tags: [Taxonomy]
 *     responses:
 *      200:
 *         description: the list of the Taxonomy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Taxonomy'
 * 
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 * 
 */

 router.get(`/`, list);

 /**
  * @swagger
  * /api/taxonomy/{slug}:
  *   parameters:
  *    - in: path
  *      name: slug
  *      description: slug
  *      required: true
  *      example: "bong-da"
  *      schema:
  *        type: string
  *   get:
  *     summary: Returns a Taxonomy
  *     tags: [Taxonomy]
  *     responses:
  *      200:
  *         description: the one of the Taxonomy
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Taxonomy'
  * 
  *      404:
  *        $ref: '#/components/responses/NotFoundError'
  * 
  */
 router.get(`/taxonomy/:slug`, read);
 
 /**
  * @swagger
  * /api/taxonomy/descendants/{tax_id}:
  *   parameters:
  *    - in: path
  *      name: tax_id
  *      description: tax id
  *      required: true
  *      example: "1121212sassa"
  *      schema:
  *        type: string
  *   get:
  *     summary: Returns a Taxonomy
  *     tags: [Taxonomy]
  *     responses:
  *      200:
  *         description: the one of the Taxonomy
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Taxonomy'
  * 
  *      404:
  *        $ref: '#/components/responses/NotFoundError'
  * 
  */
 router.get(`/descendants/:tax_id`, descendants); //hiển thị các con của danh mục cha
 router.get(`/tax/search`, search);
 /**
  * @swagger
  * /api/taxonomy:
  *   post:
  *     summary: Returns a Taxonomy
  *     tags: [Taxonomy]
  *     security:
  *        - bearerAuth: []
  *     requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                tax_name:
  *                  type: string
  *                  example: "jason"
  *                  required: true,
  *                tax_description:
  *                  type: string
  *                  example: "áassas"
  *                tax_type:
  *                  type: string
  *                  example: "áassas"
  *                tax_slug:
  *                  type: string
  *                  example: "áassas"
  *                tax_parent:
  *                  type: string
  *                  example: "áassas"
  *                tax_ancestors:
  *                  type: string
  *                  example: "áassas,3122dsđssd"
  *     responses:
  *      200:
  *         description: the one of the Taxonomy
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Taxonomy'
  * 
  *      404:
  *        $ref: '#/components/responses/NotFoundError'
  * 
  */
 router.post(`/`, authorize(permissionFunction.CATEGORIES, permissionFieldName.ADD), create );
 
 /**
  * @swagger
  * /api/taxonomy/{id}:
  *   parameters:
  *    - in: path
  *      name: id
  *      description: tax id
  *      required: true
  *      example: "1121212sassa"
  *      schema:
  *        type: string
  *   put:
  *     summary: Returns a Taxonomy
  *     tags: [Taxonomy]
  *     security:
  *        - bearerAuth: []
  *     requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                tax_name:
  *                  type: string
  *                  example: "jason"
  *                  required: true,
  *                tax_description:
  *                  type: string
  *                  example: "áassas"
  *                tax_type:
  *                  type: string
  *                  example: "áassas"
  *                tax_slug:
  *                  type: string
  *                  example: "áassas"
  *                tax_parent:
  *                  type: string
  *                  example: "áassas"
  *                tax_ancestors:
  *                  type: string
  *                  example: "áassas,3122dsđssd"
  *     responses:
  *      200:
  *         description: the one of the Taxonomy
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Taxonomy'
  * 
  *      404:
  *        $ref: '#/components/responses/NotFoundError'
  * 
  */
 router.put('/:id',authorize(permissionFunction.CATEGORIES, permissionFieldName.EDIT), updateTaxonomy);
 
 /**
  * @swagger
  * /api/taxonomy/remove/{slug}:
  *   parameters:
  *    - in: path
  *      name: slug
  *      description: slug
  *      required: true
  *      example: "nhan-dinh"
  *      schema:
  *        type: string
  *   get:
  *     summary: Returns a Taxonomy
  *     tags: [Taxonomy]
  *     security:
  *        - bearerAuth: []
  *     responses:
  *      200:
  *         description: the one of the Taxonomy
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Taxonomy'
  * 
  *      404:
  *        $ref: '#/components/responses/NotFoundError'
  * 
  */
 router.delete(`/remove/:id`,authorize(permissionFunction.CATEGORIES, permissionFieldName.DELETE), remove);
 /**
  * @swagger
  * /api/taxonomy/removeTax/{slug}:
  *   parameters:
  *    - in: path
  *      name: slug
  *      description: slug
  *      required: true
  *      example: "nhan-dinh"
  *      schema:
  *        type: string
  *   get:
  *     summary: Returns a Taxonomy
  *     tags: [Taxonomy]
  *     security:
  *        - bearerAuth: []
  *     responses:
  *      200:
  *         description: the one of the Taxonomy
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Taxonomy'
  * 
  *      404:
  *        $ref: '#/components/responses/NotFoundError'
  * 
  */
 router.delete(`/removeTax/:id`, authorize(permissionFunction.CATEGORIES, permissionFieldName.DELETE), removeTax) //Xoá danh mục (xoá các danh mục con cháu của nó) 
 
 router.get('/getByType/:type', getByType);

module.exports = router