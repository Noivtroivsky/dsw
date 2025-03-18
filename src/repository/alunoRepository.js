import connection from './connection.js'


export async function inserir(aluno) {
  const comando = `
    INSERT INTO tb_aluno (nm_aluno, ds_turma)
                  VALUES (?, ?) `
  
  let [info] = await connection.query(comando, [aluno.nome, aluno.turma]);
  return info.insertId;
}


export async function alterar(id, aluno) {
  const comando = `
    UPDATE tb_aluno
       SET nm_aluno = ?,
           ds_turma = ?
     WHERE id_aluno = ?`
  
  let [info] = await connection.query(comando, [aluno.nome, aluno.turma, id]);
  return info.affectedRows;
}



export async function remover(id) {
  const comando = `
    DELETE FROM tb_aluno
     WHERE id_aluno = ?` 
  
  let [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}




export async function listar() {
  const comando = `SELECT id_aluno as id,
                          nm_aluno as nome,
                          ds_turma as turma 
                     FROM tb_aluno`;
  
  let [registros] = await connection.query(comando);
  return registros;
}
