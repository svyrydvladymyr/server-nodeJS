let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let {registrationUsers, addAvatoDB, savesett, beforedeluser} = require('./modules/registration');
let {updatesecurity, updaterender, updatemain, updateother, updateAvatoDB, widgetsett} = require('./modules/updateuser');
let {showskills, addskills, showorhiddenskills, showskillsingle, editskill, updateallskill} = require('./modules/skills');
let {showprojects, addprojects, showorhiddenproj, editproject, showprojsingle, updateallprojects} = require('./modules/projects');
let {searchUser, addtofriends, prooftofriends, delfromfriends, showfriends} = require('./modules/searchuser');
let {autorisation, exit, sendemail, verifyuser, autorisationSocial, autorisRouts, recoverdata} = require('./modules/autorisation');
let {sendmessage, messangerlist, showmessage, showmess, delmess, delallmess, updatemessnew, messangernewkilk} = require('./modules/messager');
let {sendpost, postlist, postshare, postlike, postdel, postlikelist, postshowcom, postsendcom, delcom} = require('./modules/blog');
let renderuser = require('./modules/renderuser');
let {accessLog, $_log} = require('./modules/service');
let passport = require('passport'); 
let FacebookStrategy = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let GitHubStrategy = require('passport-github').Strategy;
let LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function(user, done) {done(null, user)});  
passport.deserializeUser(function(obj, done) {done(null, obj)});
app.use(passport.initialize());

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: '435548787037664',
    clientSecret: '1a2fde88089878abfa800a93a0fccbd0',
    callbackURL: "https://svyrydvladymyr.herokuapp.com/facebookcallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
}, function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebookcallback', function(req, res, next) {passport.authenticate('facebook', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: '422337007127-73a8ofjsl3a6n7kesl3tnk0c11jo4ou6.apps.googleusercontent.com',
    clientSecret: '1J24VS_1Yrk27ZZCgs5NMk60',
    callbackURL: "https://svyrydvladymyr.herokuapp.com/googlecallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
  },  function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));
app.get('/googlecallback', function(req, res, next) {passport.authenticate('google', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: '306581483c8927ca31b4',
    clientSecret: '13853ceb1fc550a6027df1efee453a9f941fd683',
    callbackURL: "https://svyrydvladymyr.herokuapp.com/githubcallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
  },  function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/github', passport.authenticate('github'));
app.get('/githubcallback', function(req, res, next) {passport.authenticate('github', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: '77jpxeqvndbl8a',
    clientSecret: 'nG1r67j9cDA4gmU8',
    callbackURL: "https://svyrydvladymyr.herokuapp.com/linkedincallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
  },  function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/linkedin', passport.authenticate('linkedin'));
app.get('/linkedincallback', function(req, res, next) {passport.authenticate('linkedin', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

//template engineer
app.set('views', __dirname + '/templates'); 
app.set('view engine', 'ejs');

//static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//logs
app.use((req, res, next) => {$_log(`////////-${req.method}-//////////`, req.url); next();});

//render page
app.use('/updateuser', (req, res) => {updaterender(req, res)});
app.use('/registration', (req, res) => {res.render(`registration`, {permissAccess: `true`})});

//messager
app.post('/sendmessage', (req, res) => {sendmessage(req, res)});
app.post('/messangerlist', (req, res) => {messangerlist(req, res)});
app.post('/showmessage', (req, res) => {showmessage(req, res)});
app.post('/showmess', (req, res) => {showmess(req, res)});
app.post('/delmess', (req, res) => {delmess(req, res)});
app.post('/delallmess', (req, res) => {delallmess(req, res)});
app.post('/updatemessnew', (req, res) => {updatemessnew(req, res)});
app.post('/messangernewkilk', (req, res) => {messangernewkilk(req, res)});

//blog
app.post('/sendpost', (req, res) => {sendpost(req, res)});
app.post('/postlist', (req, res) => {postlist(req, res)});
app.post('/postshare', (req, res) => {postshare(req, res)});
app.post('/postlike', (req, res) => {postlike(req, res)});
app.post('/postdel', (req, res) => {postdel(req, res)});
app.post('/postlikelist', (req, res) => {postlikelist(req, res)});
app.post('/postshowcom', (req, res) => {postshowcom(req, res)});
app.post('/postsendcom', (req, res) => {postsendcom(req, res)});
app.post('/delcom', (req, res) => {delcom(req, res)});

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
app.post('/recoverdata', (req, res) => {recoverdata(req, res)});

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

//del
app.post('/beforedeluser', (req, res) => {beforedeluser(req, res)});

//logs
app.use((req, res, next) => {accessLog(req, res, next)});

//user pages
app.use('/:userid$', (req, res) => {renderuser(req, res)});
app.get('/$', (req, res, next) => {res.redirect('index')});
app.get('*', (req, res) => {res.status(404).send(`<p style="text-align: center; color: red; margin: 200px auto; font: bold 30px Arial;">PAGE NOT FOUND!!!</p>`);});

app.listen(process.env.PORT || 4000, () => {console.log('Server is running...')});