// // Verifica se o usuário está logado
// const authMiddleware = (req, res, next) => {
//     const isAuth = req.cookies.user;
//     // Se está autenticado vai para a próxima função
//     if (isAuth) {
//       next();
//     }
//     // Se não apaga cache e destroi sessão
//     else {
//       req.session.destroy();
//       res.clearCookie("user");
//       res.clearCookie("admin");
//       res.redirect("/");
//     }
//   };
//   module.exports = authMiddleware;
  

// Verifica se o usuário está logado
const authMiddleware = (req, res, next) => {
  const isAuth = req.cookies.user;
  
  // Adiciona a variável 'user' ao objeto 'res.locals'
  res.locals.user = isAuth;

  next();
};

module.exports = authMiddleware;
