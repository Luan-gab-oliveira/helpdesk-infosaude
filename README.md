<h1 align="center">Helpdesk infosaude <img src="public/img/4712009.png" height="40em" alt="helpdesk"></h1>

<p align="justify">Helpdesk infosaude é um sistema web desenvolvido para fornecer suporte técnico aos usuários internos da Secretaria Municipal de Saúde. Projetado para simplificar a comunicação entre os usuários e a equipe de suporte. O sistema de helpdesk permite que os funcionários da Secretaria Municipal de Saúde solicitem suporte técnico, e acompanhem o status de suas solicitações. Além disso, oferece aos administradores ferramentas para atribuir tickets, monitorar o progresso das soluções e gerar relatórios para análise e melhoria contínua dos serviços de TI.</p>

![Node.js](https://img.shields.io/badge/-Node.js-05122A?style=flat&logo=node.js)&nbsp;
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![Bootstrap](https://img.shields.io/badge/-Bootstrap-05122A?style=flat&logo=bootstrap)&nbsp;
![MySQL](https://img.shields.io/badge/-MySQL-05122A?style=flat&logo=mysql)&nbsp;


<h2>Principais Características e Funcionalidades</h2>

<h3>Autenticação e Controle de Acesso:</h3>
Utiliza autenticação de usuário com Passport.js e Express Session para garantir que apenas usuários autorizados possam acessar o sistema.
Controle de acesso entre usuários comuns e administradores, garantindo que apenas administradores possam acessar o painel administrativo.

<h3>Gestão de chamados:</h3>
Permite a abertura, acompanhamento e fechamento de chamados de suporte técnico.
Atribuição automática ou manual de tickets a técnicos de suporte.
Possibilidade de categorizar os chamados por tipo de problema (por exemplo, hardware, software, rede) para facilitar a triagem e resolução.

<h3>Monitoramento</h3>

Funcionalidade de monitoramento em tempo real do status dos chamados, permitindo aos administradores acompanhar o progresso das solicitações.

<h3>Comunicação:</h3>
Capacidade de enviar mensagens e atualizações referente ao ticket gerado,  facilitando o acompanhamento do progresso e a comunicação entre a equipe de suporte e os usuários.

<h3>Gestão de Materiais e Equipamentos</h3>
O sistema permite o registro e o controle dos materiais e equipamentos utilizados no suporte técnico, facilitando a reposição de estoques e o gerenciamento de ativos de TI.

<h3>Integração com Banco de Dados:</h3>

Utiliza um banco de dados MySQL para armazenar informações sobre usuários, chamados, equipamentos, materiais, atividades e configurações do sistema.
Integração simplificada com o banco de dados através do ORM Sequelize.

<h3>Integração com Email</h3>
O sistema possui integração com o serviço de email da Secretaria Municipal de Saúde, permitindo o envio dos tickets para empresas parceiras.

<h3>Interface Amigável:</h3>

Utilizando o Handlebars como mecanismo de template e o bootstrap para criação da interface gráfica, o sistema apresenta uma interface intuitiva e responsiva, facilitando a interação dos usuários e administradores com o sistema.

<h2>Galeria</h2>

<img src="galeria/Captura de tela 2024-02-15 143230.png" alt="Login">
<img src="galeria/Captura de tela 2024-02-15 142758.png" alt="chamados em aberto">
<img src="galeria/Captura de tela 2024-02-15 142828.png" alt="Abertura de chamado">
<img src="galeria/Captura de tela 2024-02-15 143740.png" alt="Visualização do chamado">

