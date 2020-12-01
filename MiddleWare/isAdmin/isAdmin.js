const isAdminCheck = (request, response, next) => {
  try {
    const userSession = request.session.user || false;

    if (userSession === false || userSession.isAdmin === false) {
      return response.status(400).json({ msg: "Not Authorized" });
    }

    next();
  } catch (error) {
    return response.status(500, {
      msg: "Server currently down please try again later",
    });
  }
};

export default isAdminCheck;
