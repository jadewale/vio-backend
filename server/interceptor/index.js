import UserService from "~/server/core/services/users";

const requestInterceptor = (req, res, next) => {
    UserService.validateUser(req, res, next);
    next()
}

export default requestInterceptor;