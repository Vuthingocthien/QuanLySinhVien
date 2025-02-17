const Constan = require("../constans/constan");
const RenderControllers = {
    signin: (req, res, next)=>{
        try {
            res.render(Constan.viewVersion + '/auth/signin');
        } catch (error) {
            console.log(error);
            
        }

    },
}
module.exports = RenderControllers;