import { listar, inserir, alterar, remover } from '../repository/turmaRepository.js'

import { Router } from "express";
const endpoints = Router();


endpoints.get('/turma', async (req, resp) => {
  let registros = await listar();
  resp.send(registros);
})

endpoints.get('/turma/busca/ano?ano=:ano', async (req, resp) => {
    let {ano} = req.query;
    let registros = await listar(ano);

    resp.send(registros);
})

endpoints.get('/turma/:ano/curso?curso=:curso', async (req, resp) => {
    let {ano} = req.params.ano;
    let {curso} = req.query;
    let registros = await listar({ano, curso});
    resp.send(registros);
})

endpoints.post('/turma', async (req, resp) => {
  let turma = req.body;

  let novoId = await inserir(turma);
  resp.send({ novoId })
})


endpoints.put('/turma/:id', async (req, resp) => {
  let id = req.params.id;
  let turma = req.body;

  let linhasAfetadas = await alterar(id, turma);
  resp.send({ linhasAfetadas })
})



endpoints.delete('/turma/:id', async (req, resp) => {
  let id = req.params.id;

  let linhasAfetadas = await remover(id);
  if (linhasAfetadas == 0) {
    return resp.status(404)
               .send({ erro: 'Registro não encontrado.' })
  }


  resp.send({ linhasAfetadas })
})




export default endpoints;