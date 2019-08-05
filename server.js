let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let {registrationUsers, addAvatoDB, savesett, beforedeluser} = require('./modules/registration');
let {updatesecurity, updaterender, updatemain, updateother, updateAvatoDB, widgetsett} = require('./modules/updateuser');
let {showskills, addskills, showorhiddenskills, showskillsingle, editskill, updateallskill} = require('./modules/skills');
let {showprojects, addprojects, showorhiddenproj, editproject, showprojsingle, updateallprojects} = require('./modules/projects');
let {searchUser, addtofriends, prooftofriends, delfromfriends, showfriends} = require('./modules/searchuser');
let {autorisation, exit, sendemail, verifyuser, autorisationSocial, autorisRouts, recoverdata} = require('./modules/autorisation');
let renderuser = require('./modules/renderuser');
let {accessLog} = require('./modules/service');
let passport = require('passport'); 
let FacebookStrategy = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let InstagramStrategy = require('passport-instagram').Strategy;
let GitHubStrategy = require('passport-github').Strategy;
let LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function(user, done) {done(null, user)});  
passport.deserializeUser(function(obj, done) {done(null, obj)});
app.use(passport.initialize());

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: '435548787037664',
    clientSecret: '1a2fde88089878abfa800a93a0fccbd0',
    callbackURL: "http://localhost:4000/facebookcallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
}, function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebookcallback', function(req, res, next) {passport.authenticate('facebook', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// Instagram Strategy
passport.use(new InstagramStrategy({
    clientID: '4f10a8f9ac6c4519825d4c5014ee231d',
    clientSecret: 'd636c67db9ee4c1cbdd711dae4639550',
    callbackURL: "http://localhost:4000/instagramcallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
}, function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/instagram', passport.authenticate('instagram'));
app.get('/instagramcallback', function(req, res, next) {passport.authenticate('instagram', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: '422337007127-73a8ofjsl3a6n7kesl3tnk0c11jo4ou6.apps.googleusercontent.com',
    clientSecret: '1J24VS_1Yrk27ZZCgs5NMk60',
    callbackURL: "http://localhost:4000/googlecallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
  },  function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));
app.get('/googlecallback', function(req, res, next) {passport.authenticate('google', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: '306581483c8927ca31b4',
    clientSecret: '13853ceb1fc550a6027df1efee453a9f941fd683',
    callbackURL: "http://localhost:4000/githubcallback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'picture.type(large)']
  },  function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
  app.get('/github', passport.authenticate('github'));
  app.get('/githubcallback', function(req, res, next) {passport.authenticate('github', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});

// LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: '77jpxeqvndbl8a',
    clientSecret: 'nG1r67j9cDA4gmU8',
    callbackURL: "http://localhost:4000/linkedincallback"
  },  function(accessToken, refreshToken, profile, done) {process.nextTick(function () {autorisationSocial(profile, done)})}));
app.get('/linkedin', passport.authenticate('linkedin'));
app.get('/linkedincallback', function(req, res, next) {passport.authenticate('linkedin', function(err, user, info) {autorisRouts(req, res, err, user)})(req, res, next)});


//template engineer
app.set('views', __dirname + '/templates'); 
app.set('view engine', 'ejs');

//logs
app.use((req, res, next) => {console.log(`--${req.method}---->> ${req.url}`); next();});

//static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//render page
app.use('/updateuser', (req, res) => {updaterender(req, res)});
app.use('/registration', (req, res) => {res.render(`registration`, {permissAccess: `true`})});

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
app.use('/:userid', (req, res) => {renderuser(req, res)});
app.use('/', (req, res, next) => {res.redirect('index'); next()});

app.listen(process.env.PORT || 4000, () => {console.log('Server is running...')});