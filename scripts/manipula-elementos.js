//Seleção de declaração de elementos
const inputNomeFuncionario = document.getElementById('nomeFuncionario')
const inputIdade = document.getElementById('idade')
const inputCpf = document.getElementById('cpf')
const selectGenero = document.getElementById('genero')
const selectEscolaridade = document.getElementById('escolaridade')
const inputEmail = document.getElementById('email')
const inputCargo = document.getElementById('cargo')
const selectDepartamento = document.getElementById('departamento')
const inputSalario = document.getElementById('salario')
const inputDataAdmissao = document.getElementById('dataAdmissao')
const btnSalvar = document.getElementById('btnSalvar')
const divVisualizacao = document.getElementById('visualizacao')
const selectTipoBusca = document.getElementById('tipoBusca')
const inputBusca = document.getElementById('inputBusca')
const divIndicadores = document.getElementById('indicadores')
const divIndicadoresPorDepartamento = document.getElementById('indicadoresPorDepartamento')
const h3QuantidadeFuncionarios = document.getElementById('quantidadeFuncionarios')
const h3TotalSalarios = document.getElementById('totalSalarios')
const h3MediaSalarios = document.getElementById('mediaSalarios')





//Seção de retorno dos inputs (Getter)
const retornaNome = () => inputNomeFuncionario.value;
const retornaIdade = () => parseInt(inputIdade.value);
const retornaCpf = () => parseInt(inputCpf.value);
const retornaGenero = () => selectGenero.value;
const retornaEscolaridade = () => selectEscolaridade.value;
const retornaEmail = () => inputEmail.value;
const retornaCargo = () => inputCargo.value;
const retornaDepartamento = () => selectDepartamento.value;
const retornaSalario = () => parseFloat(inputSalario.value);
const retornaDataAdmissao = () => inputDataAdmissao.value;
const retornaTipoBusca = () => selectTipoBusca.value;



//Seção de setar dados (Setter)
const setaNome = nome => inputNomeFuncionario.value = nome;
const setaIdade = idade => inputIdade.value = idade;
const setaCpf = cpf => inputCpf.value = cpf;
const setaGenero = genero => selectGenero.value = genero;
const setaEscolaridade = escolaridade => selectEscolaridade.value = escolaridade;
const setaEmail = email => inputEmail.value = email;
const setaCargo = cargo => inputCargo.value = cargo;
const setaDepartamento = departamento => selectDepartamento.value = departamento;
const setaSalario = salario => inputSalario.value = salario;
const setaDataAdmissao = dataAdmissao => inputDataAdmissao.value = dataAdmissao;
const setaDadosDivVisualizacaoCards = cards => divVisualizacao.innerHTML = cards;
const setaDadosDivIndicadores = listaH3 => divIndicadores.innerHTML = listaH3;

const setaH3QuantidadeFuncionarios = (texto) => {
    h3QuantidadeFuncionarios.innerText = texto;
}
const setaH3TotalSalarios = (texto) => {
    h3TotalSalarios.innerText = texto;
}
const setaH3MediaSalarios = (texto) => {
    h3MediaSalarios.innerText = texto;
}

const setaIndicaresPorDepartamento = (texto) => {
    divIndicadoresPorDepartamento.innerHTML = texto;
}

