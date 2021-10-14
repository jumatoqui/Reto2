/* ************************************* TABLA CLIENT ************************************************/

//CREACIÓN FUNCIÓN PARA CONSULTAR TODOS LOS REGISTRO DE CLIENTES


function consultar(){
    $.ajax({
        url : 'https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'GET',
        datatype : 'json',
        success : function(respuesta){
        
            console.log(respuesta);
            pintarRespuesta(respuesta.items);

        },
        error : function(xhr, status){
            alert('ha sucedido un problema, '+xhr.status);
        },
        complete : function(xhr, status){
            alert('peticion realizada, '+xhr.status);
        }
    });
}

function pintarRespuesta(items){
    var myTable="<table>";
    for(i= 0; i < items.length; i++){
    myTable+="<tr>";
    myTable+="<td>"+items[i].id+"<td>";
    myTable+="<td>"+items[i].name+"<td>";
    myTable+="<td>"+items[i].email+"<td>";
    myTable+="<td>"+items[i].age+"<td>";
    
    myTable+="<tr>"
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

$(document).ready(function(){
    $("#registercform").submit(function(evento){evento.preventDefault()})
    $("#consultarctId").click(function(evento){evento.preventDefault();consultar($("#idclientes").val())
    })
})

//CREACIÓN FUNCIÓN PARA CONSULTAR LOS REGISTRO DE CLIENTES POR ID Y MOSTRAR EL DETALLE//
function obtenerItem(idItem){
    $.ajax({
        dataType: 'json',
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/cliente/"+idItem,
        type:'GET',
        success:function(response) {
          console.log(response);
          
          var item=response.items[0];
          $("#Id").val(item.id);
          $("#name").val(item.name);
          $("#email").val(item.email);
          $("#age").val(item.age);
          },
                
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
}

$(document).ready(function(){
$("#registercform").submit(function(evento){evento.preventDefault()})
$("#consultarcId").click(function(evento){evento.preventDefault();obtenerItem($("#idclientes").val())
})
})

//CREACIÓN FUNCIÓN PARA GUARDAR UN REGISTRO DE CLIENTES
function guardarCliente(){
    $.ajax({
        url : 'https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        data : {
            id : $("#idclientes").val(),
            name : $("#name").val(),
            email : $("#email").val(),
            age : $("#age").val() },
        
            
        type : 'POST',
        datatype : 'json',
        success : function(respuesta, textStatus, xhr){
            alert("se ha guardado correctamente");
            $("#idclientes").val(""),
            $("#name").val(""),
            $("#email").val(""),
            $("#age").val("")
           
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
            
        },
        error : function(xhr, status){
            alert('ha sucedido un problema, '+xhr.status);
        },
        complete : function(xhr, status){
            alert('peticion realizada, '+xhr.status);
            
        }
        
        
    });
}


$(document).ready(function(){
$("#registercform").submit(function(evento){evento.preventDefault()})
$("#agregarcId").click(function(evento){evento.preventDefault();guardarCliente($("#idclientes").val())
})
})

//CREACIÓN FUNCIÓN PARA ACTUALIZAR UN REGISTRO DE CLIENTES
function editarCliente(){
    let= myData={
        id: $("#idclientes").val(),
		name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val()
    };
    console.log(myData);
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dAtaToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("se han actualizado los datos del cliente")
            $("#resultado").empty();
            $("#idclientes").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            traerInformacion();
            
        }
    }

    )
}

$(document).ready(function(){
    $("#registercform").submit(function(evento){evento.preventDefault()})
    $("#editarcId").click(function(evento){evento.preventDefault();editarCliente($("#idclientes").val())
})
})

//CREACIÓN FUNCIÓN PARA BORRAR UN REGISTRO
function borrarCliente(idElemento){
    let myData={
        id:idElemento
    };
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dAtaToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Se ha eliminado el registro")
            $("#resultado").empty();
            limpiarCamposC()
        }
    }
    )
}
$(document).ready(function(){
    $("#registercform").submit(function(evento){evento.preventDefault()})
    $("#borrarcId").click(function(evento){evento.preventDefault();borrarCliente($("#idclientes").val())
})
})

function limpiarCamposC(){
    $("#idclientes").val("");
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}
//-----------------------------------------------------------------------------------------------------------------------
//Creacion de las funciones para el modulo de MENSAJES
//-----------------------------------------------------------------------------------------------------------------------
//CREACIÓN FUNCIÓN PARA TRAER INFORMACIÓN
function traerInformacionM(){
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaM){

            console.log(respuestaM);
            pintarRespuestaM(respuestaM.items);
        },
        error : function(xhr, status){
            alert('ha sucedido un problema, '+xhr.status);
        },
        complete : function(xhr, status){
            alert('peticion realizada, '+xhr.status);
        }
    });
}
//CREACIÓN FUNCIÓN PARA PINTAR LA RESPUESTA AL USUARIO
function pintarRespuestaM(items){
    let myTable="<table>";
    for (i=0; i<items.length; i++) {
    myTable+="<tr>";
    myTable+="<td>"+items[i].id+"</td>";
    myTable+="<td>"+items[i].messagetext+"</td>";
        
    myTable+="</tr>"     
    }
    myTable+="</table>";
    $("#resultadoM").append(myTable);
}

$(document).ready(function(){
$("#registermform").submit(function(evento){evento.preventDefault()})
$("#consultarmtId").click(function(evento){evento.preventDefault();traerInformacionM($("#idmensaje").val())
})
})


//CREACIÓN FUNCIÓN PARA BUSCAR LOS MENSAJES POR ID
function obtenerItemM(){
    $.ajax({
        dataType:'json',
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/"+$("#idmensaje").val(),
        type:'GET',
        success:function(respuestaM) {
          console.log(respuestaM);

          var item=respuestaM.items[0];
          $("#idmensaje").val(item.id);
          $("#messagetext").val(item.messagetext);
          },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
  
}

$(document).ready(function(){
$("#registermform").submit(function(evento){evento.preventDefault()})
$("#consultarmId").click(function(evento){evento.preventDefault();obtenerItemM($("#idmensaje").val())
})
})
//CREACIÓN FUNCIÓN PARA CREAR NUEVOS MENSAJES
function guardarMensaje(){
	let myData = {
        id: $("#idmensaje").val(),
		messagetext: $("#messagetext").val(),
	};
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuestaM){
            $("#resultadoM").empty();
            $("#idmensaje").val("");
            $("#messagetext").val("");
            traerInformacionM();
            alert("se ha guardado el registro")
        }

    });
}


$(document).ready(function(){
$("#registermform").submit(function(evento){evento.preventDefault()})
$("#agregarmId").click(function(evento){evento.preventDefault();guardarMensaje($("#idmensaje").val())
})
})
//CREACIÓN FUNCIÓN PARA ACTUALIZAR UN REGISTRO DE MENSAJES
function editarMensajes(){
    let= myData={
        id: $("#idmensaje").val(),
		messagetext: $("#messagetext").val()
    };
    console.log(myData);
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dAtaToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaM){
            alert("se ha actualizado la información del mensaje")
            $("#resultadoM").empty();
            $("#idmensaje").val("");
            $("#messagetext").val("");
            traerInformacionM();
        }
    });
}
$(document).ready(function(){
$("#registermform").submit(function(evento){evento.preventDefault()})
$("#editarmId").click(function(evento){evento.preventDefault();editarMensajes($("#idmensaje").val())
})
})
//CREACIÓN FUNCIÓN PARA BORRAR UN MENSAJE
function borrarElementoM(idElementoM){
    let myData={
        id:idElementoM
    };
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dAtaToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaM){
            alert("Se ha eliminado el Mensaje")
            $("#resultadoM").empty();
            limpiarCamposM();
        }
    }
        
    )
}

function limpiarCamposM(){
    $("#idmensaje").val("");
    $("#messagetext").val("");
}
    
$(document).ready(function(){
$("#registermform").submit(function(evento){evento.preventDefault()})
$("#borrarmId").click(function(evento){evento.preventDefault();borrarElementoM($("#idmensaje").val())
})
})

//-----------------------------------------------------------------------------------------------------------------------
//Creacion de las funciones para el modulo de SALON DE FIESTAS
//-----------------------------------------------------------------------------------------------------------------------
//CREACIÓN FUNCIÓN PARA TRAER INFORMACIÓN
function traerInformacionS(){
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaS){
            console.log(respuestaS);
            pintarRespuestaSalones(respuestaS.items);
        },
        error : function(xhr, status){
            alert('ha sucedido un problema, '+xhr.status);
        },
        complete : function(xhr, status){
            alert('peticion realizada, '+xhr.status);
        }
    });
}
//CREACIÓN FUNCIÓN PARA PINTAR LA RESPUESTA AL USUARIO
function pintarRespuestaSalones(items){
    let myTable="<table>";
    for (i=0; i<items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].owner+"</td>";
        myTable+="<td>"+items[i].capacity+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"; 
        myTable+="</tr>";        
    }
    myTable+="</table>";
    $("#resultadoS").append(myTable);
}

$(document).ready(function(){
$("#registersform").submit(function(evento){evento.preventDefault()})
$("#consultarstId").click(function(evento){evento.preventDefault();traerInformacionS($("#idsalones").val())
})
})
//CREACIÓN FUNCIÓN PARA BUSCAR LOS SALONES POR ID
function obtenerItemS(){
    $.ajax({
        dataType:'json',
        url:'https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/'+$("#idSalones").val(),
        type:'GET',
        success:function(respuestaS) {
          console.log(respuestaS);

          var item=respuestaS.items[0];
          $("#idSalones").val(item.id);
          $("#owner").val(item.owner);
          $("#capacity").val(item.capacity);
          $("#category_id").val(item.category_id);
          $("#namesalones").val(item.name);
          },
          error: function(jqXHR, textStatus, errorThrown) {
          }
    });
  
}

$(document).ready(function(){
$("#registersform").submit(function(evento){evento.preventDefault()})
$("#consultarsId").click(function(evento){evento.preventDefault();obtenerItemS($("#idsalones").val())
})
})

//CREACIÓN FUNCIÓN PARA CREAR NUEVOS SALONES
function guardarInfoSalones(){
	let myData = {
        id: $("#idSalones").val(),
		owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        category_id: $("#category_id").val(),
        name: $("#namesalones").val()
	};
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuestaS){
            $("#resultadoS").empty();
            $("#idSalones").val("");
            $("#owner").val("");
            $("#capacity").val("");
            $("#category_id").val("");
            $("#namesalones").val("");
            traerInformacionS();
            alert("se ha guardado el Salon")
        }

    });
}

$(document).ready(function(){
$("#registersform").submit(function(evento){evento.preventDefault()})
$("#agregarsId").click(function(evento){evento.preventDefault();guardarInfoSalones($("#idSalones").val())
})
})

//CREACIÓN FUNCIÓN PARA ACTUALIZAR UN REGISTRO DE SALON
function editarInformacionS(){
    let= myData={
        id: $("#idSalones").val(),
		owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        category_id: $("#category_id").val(),
        name: $("#namesalones").val()
    };
    console.log(myData);
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type:"PUT",
        data:dAtaToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaS){
            alert("se ha actualizado el Salón")
            $("#resultadoS").empty();
            $("#idSalones").val("");
            $("#owner").val("");
            $("#capacity").val("");
            $("#category_id").val("");
            $("#namesalones").val("");
            traerInformacionS();
            
        }
    }

    )
}

$(document).ready(function(){
$("#registersform").submit(function(evento){evento.preventDefault()})
$("#editarsId").click(function(evento){evento.preventDefault();editarInformacionS($("#idsalones").val())
})
})
//CREACIÓN FUNCIÓN PARA BORRAR UN SALON
function borrarElementoS(idElementoS){
    let myData={
        id:idElementoS
    };
    let dAtaToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gd7875acd9fe525-sfdb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type:"DELETE",
        data:dAtaToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaS){
            alert("Se ha eliminado el Salón")
            $("#resultadoS").empty();
            
            traerInformacionS();
        }
    }
        
    )
}

$(document).ready(function(){
$("#registersform").submit(function(evento){evento.preventDefault()})
$("#borrarsId").click(function(evento){evento.preventDefault();borrarElementoS($("#idSalones").val())
})
})

function limpiarCamposM(){
    $("#idSalones").val("");
    $("#owner").val("");
    $("#capacity").val("");
    $("#category_id").val("");
    $("#namesalones").val("");l("");
  
}

