const wrap = handlerFunc => async (req, res, next) => {
    try {
        await handlerFunc(req, res, next);
    } catch (e) {
        return next(e);
    }
};

export default wrap;
