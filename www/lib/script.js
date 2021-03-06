// This is a JavaScript file
window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const id = document.querySelector("#id");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");
  const code = document.querySelector("#code");

  /// ação de cadastrar uma pessoa e curso
  cadastrar.addEventListener("click", function(){
    TestarConexao();
    let formdata = new FormData();
    formdata.append('nome',`${nome.value}`);
    formdata.append('curso',`${curso.value}`);
    
    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa", 
    {
      body:formdata,
      method:"post",
      mode:'cors',
      cache:'default'

    }).then(()=>{
       alert("Registro efetuado com sucesso");
       limparCampos();
    });
  });

  ///metodo que lista uma pessoa
  buscar.addEventListener("click", function(){
  TestarConexao();
  fetch (`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{  

      method:"get",
      mode:'cors',
      cache:'default'  

  }).then(response=>{
   response.json().then(data => {
     nome.value = data['nome'];
     curso.value = data['curso'];     
      })
    })
  })

    ///metodo para alterar os dados 
    alterar.addEventListener("click", function(){
      TestarConexao();
      fetch (`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{  
      method:"put",
      mode:'cors',
      cache:'default',  
      headers:{
        'Content-type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify({
      'nome':`${nome.value}`,
      'curso':`${curso.value}`
      })
    }).then(()=>{
       alert("Registro alterado com sucesso");
       limparCampos();  
    });
  });
  
   /// metodo para deletar o registro
   deletar.addEventListener("click", function(){
     TestarConexao();
      fetch (`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{  
      method:"delete",
      mode:'cors',
      cache:'default',
     }).then(()=>{
       alert("O registro foi deletado com sucesso");
       limparCampos();
       });
   })
      
  ///metodo para limpar os campos
  function limparCampos(){
    nome.value = "";
    curso.value = "";
  }

///buscar com qr code
  code.addEventListener("click", function(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
      fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${result.text}`,{
      method:"get",
      mode:'cors',
      cache:'default'
    }).then(response=>{
      response.json().then(data => {
        nome.value = data['nome'];
        curso.value = data['curso'];
      })
    })
  },
      function (error) {
          alert("Ocorreu algum erro: " + error);
      },
      {
          preferFrontCamera : false, 
          showFlipCameraButton : true, 
          showTorchButton : true,
          torchOn: true, 
          saveHistory: true, 
          prompt : "Place a barcode inside the scan area", 
          resultDisplayDuration: 500, 
          formats : "QR_CODE,PDF_417, CODE_39", 
          orientation : "landscape",
          disableAnimations : true, 
          disableSuccessBeep: true 
      }
   );
});
//metodo para sair do app
function sair(){
  navigator.app.exitApp();
}

//metodo verificar conexao
 function TestarConexao() {
    var networkState = navigator.connection.type;

    if (networkState == Connection.NONE){
    function TestarConexao(buttonIndex){
       if(buttonIndex == "2"){
        sair();
       }
     }
navigator.notification.confirm(
  "Você está sem conexão, tente novamente",
   TestarConexao,
   "Erro na Conexão!",
    ['Tentar Novamente','Sair']);
   }
  }
}
