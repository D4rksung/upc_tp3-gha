const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

router.render = (req,res) =>{
  console.log(req.body);
  res.jsonp({
    data: res.locals.data
  })
}

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

