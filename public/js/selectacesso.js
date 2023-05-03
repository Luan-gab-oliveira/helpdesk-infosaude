var optionselect = document.getElementById('tpAcesso').value;
var select = document.getElementById('acesso');

for(var i=0; i < select.options.length; i++){
    if(select.options[i].value === optionselect){
        select.selectedIndex = i;
        break;
    }
}