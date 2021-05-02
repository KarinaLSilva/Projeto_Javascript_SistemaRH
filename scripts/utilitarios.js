// Funções alta ordem elas podem receber outras funções por parâmetros

const somar = (n1, n2) => n1 + n2; 
const subtrair = (n1, n2) => n1 - n2;
const multiplicar = (n1, n2) => n1 * n2;
const dividir = (n1, n2) => n1 === 0 ? 0 : n1 / n2;

// Função de alta ordem que recebe função por parâmetro.
const calcular = (operacao, n1, n2) => operacao(n1, n2);

const criarExibirMensagem = funcaoExibeTexto => texto => funcaoExibeTexto(texto);

const exibeMensagemSucesso = criarExibirMensagem(alert);

const exibeMensagemErro = criarExibirMensagem(alert);



// const padraoCpf = new RegExp('[-|.]', 'g')

const formataSalario = numero => parseFloat(numero) ? numero.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : 0;

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

function formatarCpf (cpf) {
    if (cpf.length <= 11){
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    

    return cpf;
}
