import express, { Request, Response } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import db from './conexao';

const app = express();
const PORT = 3000;

const AUTH_COOKIE_NAME = 'auth-token';
const REFRESH_COOKIE_NAME = 'refresh-token';

const JWT_SECRET = 'your-secret-key'; // Alterar para uma chave secreta forte
const JWT_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Estratégia Local para login
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
}, async (email: string, senha: string, done: Function) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return done(null, false, { message: 'Email inválido' });
        }

        if (senha.length < 6) {
            return done(null, false, { message: 'Senha deve ter pelo menos 6 caracteres' });
        }

        const result = await db.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);

        if (result.rows.length === 0) {
            return done(null, false, { message: 'Credenciais inválidas' });
        }

        return done(null, result.rows[0]);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return done(error);
    } 
}));

passport.serializeUser((user: any, done: Function) => {
    done(null, user.email);
});

passport.deserializeUser(async (email: string, done: Function) => {
    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return done(new Error('Usuário não encontrado'));
        }

        return done(null, result.rows[0]);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return done(error);
    } 
});

// Estratégia JWT para verificar tokens nas requisições
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [jwt_payload.email]);
        if (result.rows.length === 0) {
            return done(null, false);
        }
        return done(null, result.rows[0]);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return done(error, false);
    }
}));

const generateTokens = (email: string) => {
    const authToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    const refreshToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    return { authToken, refreshToken };
};

// Endpoint de login
app.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate('local', (err: any, user: { email: string; }, info: any) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
        
        const { authToken, refreshToken } = generateTokens(user.email);
        res.cookie(AUTH_COOKIE_NAME, authToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict' 
        });
        res.cookie(REFRESH_COOKIE_NAME, refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict' 
        });
        res.json({ message: 'Login successful' });
    })(req, res, next);
});

// Endpoint de logout
app.post('/logout', (req: Request, res: Response) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.clearCookie(REFRESH_COOKIE_NAME);
    res.json({ message: 'Logout successful' });
});

// Endpoint para refresh token
app.post('/refresh', (req: Request, res: Response) => {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
    if (refreshToken) {
        jwt.verify(refreshToken, JWT_SECRET, (err: any, decoded: any) => {
            if (err) return res.status(401).send('Unauthorized');
            const { authToken, refreshToken: newRefreshToken } = generateTokens(decoded.email);
            res.cookie(AUTH_COOKIE_NAME, authToken, { 
                httpOnly: true, 
                secure: true, 
                sameSite: 'strict' 
            });
            res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, { 
                httpOnly: true, 
                secure: true, 
                sameSite: 'strict' 
            });
            res.send('Tokens refreshed');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Endpoint protegido
app.get('/protected', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    res.send(`Hello, ${req.user.email}. This is a protected route`);
});

// Cookies de desempenho, anúncio e personalização
app.get('/set-performance-cookie', (req: Request, res: Response) => {
    res.cookie('performance-cookie', 'performanceData', { 
        maxAge: 3600000, sameSite: 'lax' 
    });
    res.send('Performance cookie set');
});

app.get('/set-ad-cookie', (req: Request, res: Response) => {
    res.cookie('ad-cookie', 'adPreferences', { 
        maxAge: 3600000, sameSite: 'lax' 
    });
    res.send('Ad cookie set');
});

app.get('/set-personalization-cookie', (req: Request, res: Response) => {
    res.cookie('personalization-cookie', 'userPreferences', { 
        maxAge: 3600000, sameSite: 'lax' 
    });
    res.send('Personalization cookie set');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
