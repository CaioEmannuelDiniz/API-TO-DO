import { Request, Response } from "express";
import {Todo} from '../models/Todo'


export const add = async (req:Request,res:Response)=>{
    let{title,done} = req.body

    if(req.body.title){
        let todo = await Todo.create({
            title: req.body.title,
            done:req.body.done ? true:false
        });

        res.json({todo});
    }else{
        res.json({error: 'Dados não enviados.'});
    }
};

export const all = async(req:Request,res:Response)=>{

    let todo = await Todo.findAll({order:['id']});

    if(todo){
        res.json({todo});
    }else{
        res.json({message:'Não possui nenhuma tarefa'});
    }
};

export const update = async (req:Request,res:Response)=>{
    let id: string = req.params.id;
    let {title,done} = req.body;

    let newtodo = await Todo.findByPk(id);

    if(newtodo){
        if(req.body.title){
            newtodo.title = title;
        }
        if(req.body.done){
           switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    newtodo.done = true;
                    break;
                case 'false':
                case '0':
                    newtodo.done = false;
                    break;

           }
        }

        await newtodo.save();
        res.json({ item: newtodo });
    }else{
        res.json({error: "Não foi encontrado a tarefa"})
    }
};

export const remove = async (req:Request,res:Response)=>{

    let id:string = req.params.id;
    

    let todo = await Todo.findByPk(id);

    if(todo){
        await todo.destroy();
        
    }

    res.json({message:`ID ${id} foi deletado `});
    
};
