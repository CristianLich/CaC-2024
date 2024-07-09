const express = require('express');
const PORT = 3000;
const app = express();
const usuarioController = require('../controllers/usuarioController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(express.json());
// Simular base de datos
const usuarios = [];
const SECRET_KEY = 'hola';

//--------------------------REGISTRAR USUARIO---------------------------
app.post('/registrar', async (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe en la BD
    const userExists = usuarios.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Almacenar en la BD
    usuarios.push({ username, password: hashedPassword });

    console.log(`Usuario registrado: ${username}`);
    console.log(usuarios);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
});

//--------------------------INICIO SESION---------------------------
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Buscar si el usuario está guardado en mi BD
    const user = usuarios.find(user => user.username === username);

    if (!user) {
        console.log('USUARIO NO ENCONTRADO');
        return res.status(404).json({ message: 'Usuario y/o contraseña incorrectos' });
    }

    // Comparar la contraseña que nos llega con la contraseña que tenemos guardada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        console.log('Contraseña incorrecta');
        return res.status(404).json({ message: 'Usuario y/o contraseña incorrectos' });
    }

    // Crear token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    console.log(`Usuario logueado: ${username}`);

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
});

//--------------------------RUTAS PROTEGIDAS---------------------------
app.get('/protegida', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ message: 'Acceso a la ruta protegida' });
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
});

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Servidor con JWT y bcrypt');
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY29sYXMiLCJpYXQiOjE3MjA0MDIxODcsImV4cCI6MTcyMDQwNTc4N30.ezWrU89JxZbdEFpbymHYCe1XFQ1KzGP_JKEecXaLpNA"
