module.exports = chackPostRoutes = (reqUrl) => {
    return ((reqUrl === '/addToDB') || 
            (reqUrl === '/updateDB')) ? true: false;
};