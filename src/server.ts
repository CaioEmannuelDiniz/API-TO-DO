import express,{Request,Response,} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/api';


dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname,'../public')));

server.use(express.urlencoded({extended: true}));

server.use(router);

server.use((req:Request, res:Response)=>{
    res.status(404);
    res.json({error: "Endpoint não localizado"})
});

server.listen(process.env.PORT);
