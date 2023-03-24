import  React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import ManageErrors from './ManageErrors';

export function UserForm() {

    const [lista, setLista] = useState([]);
    const [nome, setNome ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [guardaDados, setGuardaDados] = useState({});

    function enviaForm(evento) {

        evento.preventDefault();
        console.log("dados sendo enviados...");
    
        $.ajax({
        url: "https://fase08profitmanager-production.up.railway.app/api/v2/auth",
    
        contentType:'application/json',
        dataType: 'json',
        accept: 'application/json',
    
        type: 'post',
        data: JSON.stringify(
            {
            name: nome,
            email: email,
            password:password,
            password_confirmation: password_confirmation,
            }
        ),
        success: function(resposta) {
            console.log("Sucesso!");
            console.log(resposta);

            var obj = guardaDados;
            $.each(resposta.data, function (index, value){
              obj[index] = value; 
            });
            setGuardaDados(obj);

            setTimeout(function() {
              var novaLista = lista;
              novaLista.push(guardaDados);


              PubSub.publish('atualiza-lista-usuario', novaLista);
              alert("cadastro realizado com sucesso!");
              setNome('')
              setEmail('')
              setPassword('')
              setPassword_confirmation('');
              setGuardaDados({});
              setLista(novaLista);
            },10); 
        },
        complete: function(resposta){
            console.log("Complete!!");
            console.log(resposta.getAllResponseHeaders());

            var obj = guardaDados;
            obj.token = resposta.getResponseHeader('access-token');
            obj.client = resposta.getResponseHeader('client');
            obj.uid = resposta.getResponseHeader('uid');
            setGuardaDados(obj)
        },
        error: function(resposta){
            if (resposta.status === 422) {
              new ManageErrors().publishErrors(resposta.responseJSON);
            }
        }
    
        });
    }

    return(

        <div>						
        <h1 class="h2">Cadastro de Usuários</h1>						
        <form method="post" onSubmit={enviaForm}>

            <InputCustomizado type="text" id="name" name="name" value={nome} 
            onChange={e => setNome(e.target.value)} placeholder="Nome" label="Name" />

            <InputCustomizado type="email" id="email" name="email" value={email} 
            onChange={e => setEmail(e.target.value)} placeholder="E-mail" label="Email" />

            <InputCustomizado type="password" id="password" name="password" value={password} 
            onChange={e => setPassword(e.target.value)} placeholder="Password" label="Password" />

            <InputCustomizado type="password" id="password_confirmation" name="password_confirmation" value={password_confirmation} 
            onChange={e => setPassword_confirmation(e.target.value)} placeholder="Confirme" label="confirme"/>


            <button type="submit" class="btn btn-primary">Inscrever-se</button>
        </form>						
        </div>

    );
}



export function UserTable () {
  const [lista, setLista] = useState([]);

  useEffect(function(){
    PubSub.subscribe('atualiza-lista-usuarios', function(topico, novaLista) { 
      console.log("nova-lista!");
      setLista(novaLista);
    });

    PubSub.subscribe('erro-validacao', function(topico, error){
      alert(error);

    });
  });

  return(
    <div class="table-responsive">
      <h2>Usuários</h2>
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>					
          {
              
            lista.map(function(user){
              return(
                <tr>
                  <td>{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                </tr>		

              )
            })
          }
        </tbody>
      </table>
    </div>


  );

}