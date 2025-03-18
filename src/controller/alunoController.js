import { listar, inserir, alterar, remover } from '../repository/alunoRepository.js'

import { Router } from "express";
const endpoints = Router();


endpoints.get('/aluno', async (req, resp) => {
  let registros = await listar();
  resp.send(registros);
})

endpoints.post('/aluno', async (req, resp) => {
  let aluno = req.body;

  let novoId = await inserir(aluno);
  resp.send({ novoId })
})


endpoints.put('/aluno/:id', async (req, resp) => {
  let id = req.params.id;
  let aluno = req.body;

  let linhasAfetadas = await alterar(id, aluno);
  resp.send({ linhasAfetadas })
})



endpoints.delete('/aluno/:id', async (req, resp) => {
  let id = req.params.id;

  let linhasAfetadas = await remover(id);
  if (linhasAfetadas == 0) {
    return resp.status(404)
               .send({ erro: 'Registro não encontrado.' })
  }


  resp.send({ linhasAfetadas })
})




export default endpoints;