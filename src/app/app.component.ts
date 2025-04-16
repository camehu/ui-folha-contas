import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AutenticacaoService } from '../service/autenticacao/autenticacao.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    Toast,
    Message,CommonModule],
    providers: [AutenticacaoService,MessageService]
})
export class AppComponent implements OnInit {
  ingredient!: string;
  formAutUser: FormGroup | undefined | any;
  isAuth: boolean = false;
  isLoggedIn = false;
  isAuthFalse:boolean = false


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AutenticacaoService,
    private messageService: MessageService,

   ){}

   showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario autenticado com sucesso' });
}


   onSubmit(){
    this.auth.autentication(this.formAutUser.value).subscribe(
      (response:any)=>{
        if(response['token']){
          this.isAuth=true;
          setTimeout(()=>{
            sessionStorage.setItem('token',response['token'])
            sessionStorage.setItem('usuario',response['usuario'])
            sessionStorage.setItem('tipo',response['tipo'])
            this.formAutUser.reset();
            this.isAuth=false;
          },3000)


        }
      }

    )
   }

  ngOnInit(){
      this.formAutUser = new FormGroup({
        userName: new FormControl <string | null>(null,Validators.required),
        passUser: new FormControl < string | null>(null,Validators.required) ,
    });

  }

}

