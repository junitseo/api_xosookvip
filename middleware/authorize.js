const {expressjwt: expressjwt} = require('express-jwt');
const { secret } = require('../config/auth.config');
// const db = require('_helpers/db');
const User = require('../models/user.js');
const RefreshToken = require('../models/refreshToken.js')
const Role = require('../models/role.js')

module.exports = authorize;

function authorize(func='', permission = '') {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressjwt({ secret, algorithms: ['HS256'] }),
        // authorize based on user role
        async (req, res, next) => {
            try {
                const user = await User.findById(req.auth.id);

                if (!user) {
                    // user no longer exists or role not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const roles = await Role.findOne({
                    name: user.role
                })
                if(permission){
                    const permissionField = roles?.permission.find(item => item.fieldName == func)
                    console.log(permissionField)
                    if(!permissionField)
                        return res.status(401).json({ message: 'Unauthorized' });
                    checkFlag = permissionField[permission]?true:false       
                    if(!checkFlag)
                        return res.status(401).json({ message: 'Unauthorized' });
      
                }

                req.auth.role = user.role;

                const refreshTokens = await RefreshToken.find({ user: user.id });
                req.auth.ownsToken = token => !!refreshTokens.find(x => x.token === token);
                next();
            } catch (error) {
                console.log(error)
                return res.status(500)
            }
            
           
            

            // authentication and authorization successful
           
        }
    ];
}