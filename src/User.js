import  React, { useState, useEffect } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';

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
        url: "https://profitmanager.onrender.com/api/v2/auth",
    
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
            console.log("resposta");
        },
        complete: function(resposta){
            console.log("Complete!!");
        },
        error: function(resposta){
            console.log("Error...");
        }
    
        });
    }

    return(

        <div>						
        <h1 class="h2">Cadastro de Usuários</h1>						
        <form method="post" onSubmit={this.enviaForm}>

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