function trasnferChamado(){
    var email = document.getElementById('emailTransfer')
    email.value = ''
    email.value = 'suporte.ti@saofranciscodosul.sc.gov.br'

    var text = document.getElementById('corpoemail')
    text.value = ''

    const corpoemail = [
        'Chamado gerado automáticamente',
        'Número do chamado: ' + document.getElementById('idChamado').value + '\n',
        'Unidade: ' + document.getElementById('unidade').value,
        'Local: ' + document.getElementById('local').value,
        'Solicitante: ' + document.getElementById('solicitante').value,
        'E-mail: ' + document.getElementById('email').value + '\n',
        'Ocorrencia: ' + document.getElementById('ocorrencia').value,
        'Descrição: ' + document.getElementById('descricao').value,
    ]

    for(var i=0; i< corpoemail.length; i++){
       text.value = text.value + corpoemail[i] + '\n'
    }

}