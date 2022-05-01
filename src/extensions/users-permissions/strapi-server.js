const jwt_decode = require('jwt-decode')
module.exports = (plugin) => {
  console.log('users-permissions start');
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };
 
  plugin.controllers.user.findOne = async (ctx) => {
    const id = ctx.params.id;
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      id,
      {
        populate: { role: true},
      }
    );
    const userId = user.id;
    const roleId = user.role.id;
    delete user.id;
    delete user.updatedAt;
    delete user.createdAt;
    delete user.role.id;
    delete user.provider;
    return {
      data: {
        id: userId,
        attributes: {
          ...sanitizeOutput(user),
          role: user.role.name
        },
      },
    };
  };

  plugin.controllers.user.me = async (ctx) => {
    console.log(JSON.stringify(ctx), "<<<<<< ctx");
    let {id} = jwt_decode(ctx.request.header.authorization)
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      id,
      {
        populate: { role: true},
      }
    );
    console.log(user, "<<<<<<<<<<< use")
    const userId = user.id;
    const roleId = user.role.id;
    delete user.id;
    delete user.updatedAt;
    delete user.createdAt;
    delete user.role.id;
    delete user.provider;
    return {
      data: {
        id: userId,
        attributes: {
          ...sanitizeOutput(user),
          role: user.role.name
        },
      },
    };
  };

  


  return plugin;
};



