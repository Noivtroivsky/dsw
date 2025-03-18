import connection from './connection.js'


export async function inserir(ator) {
  const comando = `
    INSERT INTO tb_ator (nm_ator, dt_nasc, bt_oscar)
                  VALUES (?, ?, ?) `
  
  let [info] = await connection.query(comando, [ator.nome, ator.nasc, ator.oscar]);
  return info.insertId;
}


export async function alterar(id, ator) {
  const comando = `
    UPDATE tb_ator
       SET nm_ator = ?,
           dt_nasc = ?,
           bt_oscar = ?
     WHERE id_ator = ?`
  
  let [info] = await connection.query(comando, [ator.nome, ator.nasc, ator.oscar, id]);
  return info.affectedRows;
}



export async function remover(id) {
  const comando = `
    DELETE FROM tb_ator
     WHERE id_ator = ?` 
  
  let [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}




export async function listar() {
  const comando = `SELECT id_ator as id,
                          nm_ator as nome,
                          dt_nasc as nasc,
                          bt_oscar as oscar
                     FROM tb_ator`;
  
  let [registros] = await connection.query(comando);
  return registros;
}
