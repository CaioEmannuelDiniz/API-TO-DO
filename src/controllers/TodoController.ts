import { title } from 'process';
import { Request, Response } from "express";
import {Todo} from '../models/Todo'
import { where } from "sequelize";

export const add = async (req:Request,res:Response)=>{
    let{title,done} = req.body

    let todo = await Todo.create({title,done});

    res.json({todo});
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
    let {id} = req.params;
    let {title,done} = req.body;

    let newtodo = await Todo.findByPk(id);

    if(newtodo){
        newtodo.title = title;
        newtodo.done = done;

        newtodo.save();
        res.json({ newtodo });
    }else{
        res.json({error: "Não foi encontrado a tarefa"})
    }
};

export const remove = async (req:Request,res:Response)=>{

    let {id} = req.params;
    await Todo.destroy({where:{id}});
    res.json({message:`ID ${id} foi deletado `});
};
