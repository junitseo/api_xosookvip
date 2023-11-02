const authorize = require('../middleware/authorize');
const express = require('express');
const router = express.Router();
const {
    getAll,
    create,
    edit,
    search,
    remove,
    getById,
    getBySlug
} = require('../controllers/page.js');
const permissionFieldName = require('../helpers/permissionFieldName')
const permissionFunction = require('../helpers/permissionFunction')

/**
 * @swagger
 *  components:
 *   schemas:
 *     Page:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example : "5eb12e197e06a76ccdefc121"
 *           description: The Auto-generated id of a dealer service
 *         page_title:
 *           type: string
 *           description: title
 *         page_description:
 *           type: string
 *           description: description
 *         page_content:
 *           type: string
 *           description: content
 *         page_category_slug:
 *           type: string
 *           description: category slug
 *         page_category_name:
 *           type: string
 *           description: category name
 *         faq_id:
 *           type: string
 *           description: array string
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
 *    name: Page
 *    description: page
 */

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: Returns all pages
 *     tags: [Page]
 *     responses:
 *      200:
 *         description: the list of the pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
 * 
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 * 
 */

router.get('/', getAll);

/**
 * @swagger
 * /api/pages/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      description: page id
 *      required: true
 *      example: "5eb12e197e06a76ccdefc121"
 *      schema:
 *        type: string
 *   get:
 *     summary: Returns a page
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: get by id of the page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Page'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', getById);
/**
 * @swagger
 * /api/pages/page/search?q={name}:
 *   parameters:
 *    - in: path
 *      description: query
 *      required: true
 *      example: "798bet"
 *      schema:
 *        type: string
 *   get:
 *     summary: Returns a page
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: get by id of the Page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Page'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get('/page/search', search);

router.get('/getBySlug/:slug', getBySlug);

/**
 * @swagger
 * /api/pages:
 *   post:
 *     summary: Returns a new page
 *     tags: [Page]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                page_title:
 *                  description: title
 *                  type: string
 *                page_description:
 *                  description: description
 *                  type: string
 *                page_content:
 *                  description: content
 *                  type: string
 *                page_category_slug:
 *                  description: category_slug
 *                  type: string
 *                page_category_name:
 *                  description: category_name
 *                  type: string
 *                faq_id:
 *                  description: nhhhhs1hhd,12221hhhsasa
 *                  type: string
 *                  required: true
 *     responses:
 *       200:
 *         description: success new page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Page'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.post('/', authorize(permissionFunction.PAGES, permissionFieldName.ADD), create)

/**
 * @swagger
 * /api/pages/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      description: page id
 *      required: true
 *      example: "5eb12e197e06a76ccdefc121"
 *      schema:
 *        type: string
 *   put:
 *     summary: Returns a edit page
 *     tags: [Page]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                page_title:
 *                  description: title
 *                  type: string
 *                page_description:
 *                  description: description
 *                  type: string
 *                page_content:
 *                  description: content
 *                  type: string
 *                page_category_slug:
 *                  description: category_slug
 *                  type: string
 *                page_category_name:
 *                  description: category_name
 *                  type: string
 *                faq_id:
 *                  description: nhhhhs1hhd,12221hhhsasa
 *                  type: string
 *                  required: true
 *     responses:
 *       200:
 *         description: success edit page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Page'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.put('/:id', authorize(permissionFunction.PAGES, permissionFieldName.EDIT), edit)

/**
 * @swagger
 * /api/pages/remove/{id}:
 *   parameters:
 *    - in: path
 *      name: id
 *      description: page id
 *      required: true
 *      example: "5eb12e197e06a76ccdefc121"
 *      schema:
 *        type: string
 *   delete:
 *     summary: 
 *     tags: [Page]
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
 *                 $ref: '#/components/schemas/Page'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/remove/:id', authorize(permissionFunction.PAGES, permissionFieldName.DELETE), remove);
module.exports = router;