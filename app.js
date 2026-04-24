const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');

// configuración variables de ambiente
dotenv.config({path : './config/config.env'})

// Manejo de excepciones no manejadas
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Bajando el servidor por excepciones no manejadas.')
    process.exit(1);
});

// Conexión a la base de datos
connectDatabase();

// Set up body parser
app.use(bodyParser.urlencoded({ extended : true }));

app.use(express.static('public'));

// Setup security headers
app.use(helmet());

// Setup body parser
app.use(express.json());

// Set cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent Parameter Pollution
app.use(hpp({
    whitelist: ['positions']
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10*60*1000, //10 Mints
    max : 100
});

// Setup CORS - Accessible by other domains
app.use(cors());

app.use(limiter);


const venta = require('./routes/venta');
const centroComercial = require('./routes/centroComercial');
const auth = require('./routes/auth')
const usuario = require('./routes/usuario');
const marca = require('./routes/marca');
const segmento = require('./routes/segmento');
const locatario = require('./routes/locatario');
const registradorLocatario = require('./routes/registradorLocatario');
const registradorCentroComercial = require('./routes/registradorCentroComercial');
const parametro = require('./routes/parametro');
const tipoDocumento = require('./routes/tipoDocumento');

app.use('/api/v1', venta);
app.use('/api/v1', centroComercial);
app.use('/api/v1', auth);
app.use('/api/v1', usuario);
app.use('/api/v1', marca);
app.use('/api/v1', segmento);
app.use('/api/v1', locatario);
app.use('/api/v1', registradorLocatario);
app.use('/api/v1', registradorCentroComercial);
app.use('/api/v1', parametro);
app.use('/api/v1', tipoDocumento);

// Manejo de rutas no manejadas
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} ruta no encontrada`, 404));
});

// Middleware para manejo de errores
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, ()=> {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Manejando las promesas de rechazo
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Bajando el Servidor por promesas de rechazos no manejadas.')
    server.close( () => {
        process.exit(1);
    }) 
});
