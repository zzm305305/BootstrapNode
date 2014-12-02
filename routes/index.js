/* GET home page. */
module.exports  = function(app){
  app.get('/', function (req, res) {
    res.render('index', 
    	{ title: '欢迎来到我的网站' ,
    	  content:'<h2>欢迎您来到我的主页</h2>',
    	  src:'images/welcome.jpg',
    	  jquery:'http://code.jquery.com/jquery-2.1.0.min.js',
    	  Bootstrap:'javascripts/bootstrap.min.js',
    	  index:'javascripts/welcome.js',
        }
    );
  });
};

