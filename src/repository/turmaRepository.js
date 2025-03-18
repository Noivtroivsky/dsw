import connection from './connection.js'


export async function inserir(turma) {
  const comando = `
    INSERT INTO tb_turma (nm_turma, ds_curso, nr_ano_letivo, qtd_capacidade, bt_ativo, dt_inclusao)
                  VALUES (?, ?, ?, ?, ?, NOW()) `
  
  let [info] = await connection.query(comando, [turma.nome, turma.curso, turma.anoLetivo, turma.capacidade, turma.ativo]);
  return info.insertId;
}


export async function alterar(id, turma) {
  const comando = `
  UPDATE tb_turma
    SET nm_turma = ?, 
      ds_curso = ?, 
      nr_ano_letivo = ?, 
      qtd_capacidade = ?, 
      bt_ativo = ?
  WHERE id_turma = ?`;
  
  let [info] = await connection.query(comando, [turma.nome, turma.curso, turma.anoLetivo, turma.capacidade, turma.ativo, id]);
  return info.affectedRows;
}



export async function remover(id) {
  const comando = `
    DELETE FROM tb_turma
     WHERE id_turma = ?` 
  
  let [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}


export async function listar() {
  const comando = `
  SELECT id_turma as id,
          nm_turma as nome,
          ds_curso as curso,
          nr_ano_letivo as anoLetivo,
          qtd_capacidade as capacidade,
          bt_ativo as ativo,
          dt_inclusao as dataInclusao
  FROM tb_turma`;
  
  let [registros] = await connection.query(comando);
  return registros;
}

export async function listarPorAno(anoLetivo) {
  const comando = `
    SELECT id_turma as id,
           nm_turma as nome,
           ds_curso as curso,
           nr_ano_letivo as anoLetivo,
           qtd_capacidade as capacidade,
           bt_ativo as ativo,
           dt_inclusao as dataInclusao
      FROM tb_turma
     WHERE nr_ano_letivo = ?`;

  let [registros] = await connection.query(comando, [anoLetivo]);
  return registros;
}

export async function listarPorCurso(curso) {
  const comando = `
    SELECT id_turma as id,
           nm_turma as nome,
           ds_curso as curso,
           nr_ano_letivo as anoLetivo,
           qtd_capacidade as capacidade,
           bt_ativo as ativo,
           dt_inclusao as dataInclusao
      FROM tb_turma
     WHERE ds_curso LIKE ?`;

  let [registros] = await connection.query(comando, [`%${curso}%`]);  // Usando LIKE para busca parcial no nome do curso
  return registros;
}