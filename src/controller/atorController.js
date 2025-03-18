import { listar, inserir, alterar, remover } from '../repository/atorRepository.js'

import { Router } from "express";
const endpoints = Router();


endpoints.get('/ator', async (req, resp) => {
  let registros = await listar();
  resp.send(registros);
})

endpoints.post('/ator', async (req, resp) => {
  let ator = req.body;

  let novoId = await inserir(ator);
  resp.send({ novoId })
})


endpoints.put('/ator/:id', async (req, resp) => {
  let id = req.params.id;
  let ator = req.body;

  let linhasAfetadas = await alterar(id, ator);
  resp.send({ linhasAfetadas })
})



endpoints.delete('/ator/:id', async (req, resp) => {
  let id = req.params.id;

  let linhasAfetadas = await remover(id);
  if (linhasAfetadas == 0) {
    return resp.status(404)
               .send({ erro: 'Registro não encontrado.' })
  }


  resp.send({ linhasAfetadas })
})




export default endpoints;