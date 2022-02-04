import  express  from 'express';
import bodyparser from 'body-parser'; 
import userRoutes from './routes/users.js'; 

const app = express();
const PORT = 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/api/users', userRoutes);

app.get('/', (req,res) => {
    res.send('Hello From Home page');
})

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))