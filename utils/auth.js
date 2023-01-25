// if the user is not logged in, redirect the user to the login page
const withAuth = (req, res, next) => {

  if (!req.session.logged_in) {
    // 
    // // 
    // // this is directly from the /gallery:id routes

    res.redirect('/login');
  } else {
    next()
  }
};

module.exports = withAuth;



//   if (!req.session.loggedIn) {      
//     res.redirect('/login');         
//   } else {                         

// // if the user is logged in, execute the route fuction
// // that will alow to view the dashboard
// // we can call next if the user is authenticated    
//     next()


