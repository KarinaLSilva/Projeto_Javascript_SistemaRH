//Seção de declaração de variáveis e constantes do sistema
const funcionarios = [];
let proximoId = 1;

//Seção de declaração de listeners
inputBusca.addEventListener('keyup', (event) => {
    const valor = event.target.value;
    const tipoBusca = retornaTipoBusca();
    const listaFuncionarios = funcionarios.filter(
        tipoBusca === 'cargo' ? buscaPorCargo(valor) :
        tipoBusca === 'nome' ? buscaPorNome(valor) :
        buscaPorId(parseInt(valor))
    )
    atualizaListagem(listaFuncionarios);
});


//Seção de declaração de buscas
const buscaPorId = id => funcionario => funcionario.id === id;
const buscaPorNome = nome => funcionario => funcionario.nome.toUpperCase().search(nome.toUpperCase()) > -1;
const buscaPorCargo = cargo => funcionario => funcionario.cargo.toUpperCase().search(cargo.toUpperCase()) > -1;


//Limpar Campo
const limpaCampos = () => {
    setaNome('');
    setaIdade('');
    setaCpf('');
    setaGenero('');
    setaEscolaridade('');
    setaEmail('');
    setaCargo('');
    setaDepartamento('');
    setaSalario('');
    setaDataAdmissao('');
}


//Adicionar Funcionário
const adicionaFuncionario = () => {
    if(!retornaNome() || !retornaIdade() ||  !retornaCpf() || !retornaGenero() || !retornaEscolaridade() || !retornaEmail() ||  !retornaCargo() || !retornaDepartamento() || !retornaSalario() || !retornaDataAdmissao())
        return exibeMensagemErro('Todos os campos são obrigatórios!');
         
    const funcionario = {
        id: proximoId,
        nome: retornaNome(),
        idade: retornaIdade(),
        cpf: retornaCpf(),
        genero: retornaGenero(),
        escolaridade:retornaEscolaridade(),
        email: retornaEmail(),
        cargo: retornaCargo(),
        departamento: retornaDepartamento(),
        salario: retornaSalario(),
        dataAdmissao: retornaDataAdmissao(),
    }
    funcionarios.push(funcionario);
    proximoId++;
    limpaCampos();
    atualizaListagem();
}

btnSalvar.onclick = adicionaFuncionario;

//VALIDAÇÃO DA IDADE
const validaRangeIdade = (idadeFuncionario, inputEvento) => {
    if(idadeFuncionario.toString().length > 1 && !(idadeFuncionario >= 18)){
        inputEvento.value = '';
        return exibeMensagemErro('O funcionário precisa ter no mínimo 18 anos!')
    } 
}

const validaIdadeCampos = () => {
    inputIdade.addEventListener('keyup', (event) => {
        const valor = parseInt(event.target.value);
        validaRangeIdade(valor, inputIdade);
    });
}
validaIdadeCampos();

//VALIDAÇÃO CPF
const validaRangeCPF = (cpfFuncionario, inputEvento) => {
    if (cpfFuncionario.toString().length > 11 && !(cpfFuncionario.toString().length < 11)){
        inputEvento.value = '';
        return exibeMensagemErro('O CPF deve conter apenas 11 caracteres!')
    }    
}


const validaCPFCampos = () => {
    inputCpf.addEventListener('keyup', (event) => {
        const valor = parseInt(event.target.value);
        validaRangeCPF(valor,inputCpf);
       
    })
}
validaCPFCampos();



//Atualizar Lista
const atualizaListagem = (listaFiltrada) => {
    let cards = '';
    const listaFuncionarios = listaFiltrada && listaFiltrada.length > 0 ? listaFiltrada : funcionarios;

    for (funcionario of listaFuncionarios) {
        cards += `
        <div class="card">
            <div class="descricao-card">
                <p>Nome do Funcionário:<b>${funcionario.nome}</b></p>
                <p>Idade:<b>${funcionario.idade}</b></p>
                <p>CPF:<b>${formatarCpf(funcionario.cpf)}</b></p>
                <p>Gênero:<b>${funcionario.genero}</b></p>
                <p>Grau de escolaridade:<b>${funcionario.escolaridade}</b></p>
                <p>E-mail:<b>${funcionario.email}</b></p>
                <p>Cargo:<b>${funcionario.cargo}</b></p>
                <p>Departamento:<b>${funcionario.departamento}</b></p>
                <p>Data de admissão:<b>${dataAtualFormatada(funcionario.dataAdmissao)}</b></p>
                <p>Salário:<b>${funcionario.salario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b></p>
            </div>
            <div class="acoes">
                <span class="material-icons acao" onclick="removerFuncionario(${funcionario.id})" > delete </span>
                <span class="material-icons acao" onclick="carregaDadosFuncionario(${funcionario.id})" > edit </span>
            </div>
        </div>
        `
    }
    setaDadosDivVisualizacaoCards(cards);
    atualizaIndicadores(listaFuncionarios);
}

//Remover funcionario
const removerFuncionario = (id) => {
    const indiceFuncionario = funcionarios.findIndex(buscaPorId(id));
    funcionarios.splice(indiceFuncionario, 1);
    atualizaListagem();
}

//Atualizar Indicadores Gerais e Por Departamento
const departamentos = [
    'Financeiro',
    'Recursos Humanos',
    'Tecnologia',
    'Marketing'
]

const buscaPorDepartamento = departamento => funcionario => funcionario.departamento === departamento;
const reduceSomaSalarios = (acc, funcionario) => acc + funcionario.salario;

const retornaIndicadoresPorDepartamento = (departamento) => {
    const funcionariosPorDepartamento = funcionarios.filter(buscaPorDepartamento(departamento));
    const qtdFuncionarios = funcionariosPorDepartamento.length;
    const totalSalarios = funcionariosPorDepartamento.reduce(reduceSomaSalarios, 0);
    const mediaSalarios = calcular(dividir, totalSalarios, qtdFuncionarios);

    return { qtdFuncionarios, totalSalarios, mediaSalarios };
}

const atualizaIndicadores = () => {
    const quantidadeFuncionarios = funcionarios.length;
    const totalSalarios = funcionarios.reduce(reduceSomaSalarios, 0);
    const mediaSalarios = calcular(dividir, totalSalarios,quantidadeFuncionarios);

    setaH3QuantidadeFuncionarios(`Total de funcionários: ${quantidadeFuncionarios}`);
    setaH3TotalSalarios(`Total de salários:${formataSalario(totalSalarios)}`);
    setaH3MediaSalarios(`Média de salários:${formataSalario(mediaSalarios)}`);
    
    const indicadoresDepartamento = departamentos.map((departamento) => {
        const indicadores = retornaIndicadoresPorDepartamento(departamento);
        return `
        <h2 class="titulo">${departamento}</h2>
        <div class="metricasPorDepartamento">
          <p>Total de Funcionários:${indicadores.qtdFuncionarios}</p>
          <p>Total de Salários:${formataSalario(indicadores.totalSalarios)}</p>
          <p>Média de Salários:${formataSalario(indicadores.mediaSalarios)}</p>
        </div>
        `
    }).join('');

    setaIndicaresPorDepartamento(indicadoresDepartamento);
}

atualizaIndicadores();

//Editar Funcionario - Salvar os dados editados
const editarDados = (id) => {
    const indiceFuncionario = funcionarios.findIndex(buscaPorId(id));
    funcionarios[indiceFuncionario] = {
        id,
        nome: retornaNome(),
        idade: retornaIdade(),
        cpf: retornaCpf(),
        genero: retornaGenero(),
        escolaridade: retornaEscolaridade(),
        email: retornaEmail(),
        cargo: retornaCargo(),
        departamento: retornaDepartamento(),
        salario: retornaSalario(),
        dataAdmissao: retornaDataAdmissao(),
    }
    limpaCampos();
    atualizaListagem();
    btnSalvar.onclick = adicionaFuncionario;
}

//Editar Funcionario - Carregar os dados na tela
const carregaDadosFuncionario = (id) => {
    const funcionario = funcionarios.find(buscaPorId(id));
    setaNome(funcionario.nome);
    setaIdade(funcionario.idade);
    setaCpf(funcionario.cpf);
    setaGenero(funcionario.genero);
    setaEscolaridade(funcionario.escolaridade);
    setaEmail(funcionario.email);
    setaCargo(funcionario.cargo);
    setaDepartamento(funcionario.departamento);
    setaSalario(funcionario.salario);
    setaDataAdmissao(funcionario.dataAdmissao);

    btnSalvar.onclick = () => editarDados(id);
}

