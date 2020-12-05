const redis = require('redis'),
	RDS_PORT = 6379,        //端口号
	RDS_HOST = '127.0.1.1',    //服务器IP
	RDS_PWD = '123456',    //密码
	RDS_OPTS = {auth_pass: RDS_PWD},
	client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.auth(RDS_PWD,function(){
	console.log('通过认证');
});

client.on('connect',function(){
	client.set('author', 'Wilson',redis.print);
	client.get('author', redis.print);
	console.log('connect');
});

client.on('ready',function(err){
	console.log(err);
});
export default client;