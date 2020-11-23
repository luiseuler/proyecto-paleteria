import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

const URL:string = "http://localhost/paleteria/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private cuenta = {usuario:"", token:"", level:""}
  private temaActivo = {idtema:'', nombre:''};
  private UsuarioAct = {user:'', nombre:'', tipo:''}

  constructor(private http: HttpClient, private galleta:CookieService) { 
    
  }

  getCuenta(){
    this.cuenta.usuario = this.galleta.get('usuario');
    this.cuenta.token = this.galleta.get('token');
    this.cuenta.level = this.galleta.get('level');
    return this.cuenta;
  }
  
  setCuenta(usuario,token,nivel){
    this.cuenta.usuario = usuario;
    this.cuenta.token = token;
    this.cuenta.level = nivel;
    this.galleta.set('usuario',usuario);
    this.galleta.set('token',token);
    this.galleta.set('level',nivel);
  }

  getTemaActivo(){
    this.temaActivo.idtema = sessionStorage.getItem("idtema");
    this.temaActivo.nombre = sessionStorage.getItem("nombretema");
    return this.temaActivo;
  }

  setTemaActivo(idtema, nombre){
    this.temaActivo.idtema = idtema;
    this.temaActivo.nombre = nombre;
    sessionStorage.setItem("idtema", idtema);
    sessionStorage.setItem("nombretema", nombre)
  }
  getUsuariosAct(){
    this.UsuarioAct.user = sessionStorage.getItem("user");
    this.UsuarioAct.nombre = sessionStorage.getItem("nombre");
    this.UsuarioAct.tipo = sessionStorage.getItem("tipo")
    return this.UsuarioAct;
  }
  getUser(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "users.php", {headers:Headers});
  }
  postUsers(Users){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();

    formData.append('user', Users.user);
    formData.append('nombre', Users.nombre);
    formData.append('pass', Users.pass);
    formData.append('tipo', Users.tipo);

    return this.http.post(URL + "users.php", formData, {headers:Headers});
  }
  putUser(Users){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params=Params.append('id', Users.user);
    Params=Params.append('nombre', Users.nombre);
    Params=Params.append('pass', Users.pass);
    Params=Params.append('tipo', Users.tipo);

    return this.http.post(URL + "users.php", null, {headers:Headers, params: Params});
  }
  deleteUser(Users){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('user',Users.user);

    return this.http.delete(URL + "users.php",{headers: Headers, params: Params});
  }
  
  login(u, p){
    let Params = new HttpParams();
    Params = Params.append('usuario', u);
    Params = Params.append('pass', p);

    return this.http.get(URL + "login.php",{params:Params});

  }

  getTemas(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "temas.php", {headers:Headers});
  }

  postTema(tema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('id', tema.idtema);
    formData.append('nombre', tema.nombre);

    return this.http.post(URL + "temas.php", formData, {headers:Headers});
  }

  putTema(tema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', tema.idtema);
    Params = Params.append('nombre', tema.nombre);

    return this.http.put(URL + "temas.php", null, {headers: Headers, params: Params});
  }

  deleteTema(tema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', tema.idtema);

    return this.http.delete(URL + "temas.php", {headers: Headers, params: Params});
  }

  getMensajes(idtema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    if(idtema!='') Params = Params.append('idtema', idtema);
    return this.http.get(URL + "mensajes.php", {headers: Headers, params: Params});
  }

  postMensaje(msg){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('idtema', msg.idtema);
    formData.append('mensaje', msg.mensaje);

    return this.http.post(URL + "mensajes.php", formData, {headers:Headers});
  }

  putMensaje(msg){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('idmsj', msg.idmsj);
    Params = Params.append('mensaje', msg.mensaje);

    return this.http.put(URL + "mensajes.php", null, {headers: Headers, params: Params});
  }

  deleteMensaje(msg){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('idmsj', msg.idmsj);

    return this.http.delete(URL + "mensajes.php", {headers: Headers, params: Params});
  }

}
