let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let {registrationUsers, addAvatoDB, savesett} = require('./modules/registration');
let {updatesecurity, updaterender, updatemain, updateother, updateAvatoDB, widgetsett} = require('./modules/updateuser');
let {showskills, addskills, showorhiddenskills, showskillsingle, editskill, updateallskill} = require('./modules/skills');
let {showprojects, addprojects, showorhiddenproj, editproject, showprojsingle, updateallprojects} = require('./modules/projects');
let {searchUser, addtofriends, prooftofriends, delfromfriends, showfriends} = require('./modules/searchuser');
let renderuser = require('./modules/renderuser');
let {accessLog} = require('./modules/service');
let {autorisation, exit, sendemail, verifyuser} = require('./modules/autorisation');
// let passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;
// passport.use(new FacebookStrategy({
//         clientID: '435548787037664',
//         clientSecret: '1a2fde88089878abfa800a93a0fccbd0',
//         callbackURL: "http://localhost:4000/auth/facebook/callback",
//         profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos']
//     },
//     function(accessToken, refreshToken, profile, done) {
//         process.nextTick(function () {                
//             console.log(profile)
//         });
//     }
// ));

app.set('views', __dirname + '/templates'); 
app.set('view engine', 'ejs');

app.use((req, res, next) => {console.log(`--${req.method}---->> ${req.url}`); next();});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/registration' }));
//render page
app.use('/updateuser', (req, res) => {updaterender(req, res)});
app.use('/registration', (req, res) => {res.render(`registration`)});
//skills
app.post('/showskills', (req, res) => {showskills(req, res)});
app.post('/addskills', (req, res) => {addskills(req, res)});
app.post('/showorhiddenskills', (req, res) => {showorhiddenskills(req, res)});
app.post('/showskillsingle', (req, res) => {showskillsingle(req, res)});
app.post('/editskill', (req, res) => {editskill(req, res)});
app.post('/updateallskill', (req, res) => {updateallskill(req, res)});
//projects
app.post('/showprojects', (req, res) => {showprojects(req, res)});
app.post('/addprojects', (req, res) => {addprojects(req, res)});
app.post('/showorhiddenproj', (req, res) => {showorhiddenproj(req, res)});
app.post('/showprojsingle', (req, res) => {showprojsingle(req, res)});
app.post('/editproject', (req, res) => {editproject(req, res)});
app.post('/updateallprojects', (req, res) => {updateallprojects(req, res)});
//verify email
app.post('/verifyuser', (req, res) => {verifyuser(req, res)});
app.post('/sendemail', (req, res) => {sendemail(req, res)});
//to friends
app.post('/addtofriends', (req, res) => {addtofriends(req, res)});
app.post('/prooftofriends', (req, res) => {prooftofriends(req, res)});
app.post('/delfromfriends', (req, res) => {delfromfriends(req, res)});
app.post('/showfriends', (req, res) => {showfriends(req, res)});
//main routs
app.post('/widgetsett', (req, res) => {widgetsett(req, res)});
app.post('/updatesecurity', (req, res) => {updatesecurity(req, res)});
app.post('/updatemain', (req, res) => {updatemain(req, res)});
app.post('/updateother', (req, res) => {updateother(req, res)});
app.post('/registrationUser', (req, res) => {registrationUsers(req, res)});
app.post('/addavatodb', (req, res) => {addAvatoDB(req, res)});
app.post('/updateavatodb', (req, res) => {updateAvatoDB(req, res)});
app.post('/savesett', (req, res) => {savesett(req, res)});
app.post('/searchuser', (req, res) => {searchUser(req, res)});
app.post('/autorisation', (req, res) => {autorisation(req, res)});
app.post('/exit', (req, res) => {exit(req, res)});
//logs
app.use((req, res, next) => {accessLog(req, res, next)});
//user pages
app.use('/:userid', (req, res) => {renderuser(req, res)});
app.use('/', (req, res, next) => {res.redirect('index'); next()});


app.listen(process.env.PORT || 4000, () => {console.log('Server is running...')});










// http.createServer((req, res) => {
//     let typeFile = mime.lookup(req.url);
//     console.log(`${req.method} --> ${req.url} --- ${typeFile}`);   
//     switch (req.method) {
//         case 'GET':    
//                 let stream = fs.createReadStream(path.join(__dirname, 'public', (req.url == '/') ? 'index.html': req.url));
//                 stream.on('error', error => errorServer(error, res));
//                 res.writeHead(200, {'Content-Type': (req.url == '/') ? 'text/html': typeFile});
//                 stream.pipe(res); 
//         break; 
//         case 'POST': 
//             if (res.statusCode === 200) {
//                 let obj = '';
//                 req.on('data', data => obj += data);                    
//                 req.on('error', error => errorServer(error, res));    
//                 req.on('end', () =>{((obj, res) => {
//                     if (trueJson(obj) !== false){
//                         switch (req.url){
//                             case '/addToDB': addToDB(trueJson(obj), res); break;
//                             case '/updateDB': updateDB(trueJson(obj), res); break;
//                             case '/getButton': getButton(trueJson(obj), res); break;}
//                     } else {errorData(`Invalid JSON object..!`, res)}})(obj, res)}); 
//             } else {errorData(`ERROR CONNECTION..! --> ${res.statusCode} -- ${res.statusMessage}`, res)}             
//         break;   
//     }}).listen(process.env.PORT || 4000, function(){console.log('Server is running...')});
