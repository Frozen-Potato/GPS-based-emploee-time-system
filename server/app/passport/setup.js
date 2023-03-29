const bcrypt = require('bcryptjs');
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const AdminsService = require('../services/admins');
const adminsService = new AdminsService();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const adminUser = await adminsService.getById(id);
    if (adminUser === null || adminUser.isActive == 0) {
        return done(null, null);
    }
    done(null, enrichUser(adminUser));
});

function enrichUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
    }
}

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (username, password, done) => {
            const adminUser = await adminsService.getByActiveEmail(username.trim().toLowerCase());

            if (!adminUser) {
                return done(null, false, { message: 'Incorrect username.' })
            }

            if (adminUser.isActive === 0) {
                return done(null, false, { message: 'Inactive user' })
            }

            if (!bcrypt.compareSync(password, adminUser.password)) {
                return done(null, false, { message: 'Incorrect password.' })
            }

            await adminsService.updateLastLogin(adminUser.id)
            return done(null, enrichUser(adminUser))
        })
);

module.exports = passport;