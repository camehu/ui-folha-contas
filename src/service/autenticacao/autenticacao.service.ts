import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, of, take } from 'rxjs';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',

})
export class AutenticacaoService {

  constructor(private http: HttpClient, private messageService: MessageService,) { }

  autentication(dataUser:any){
    return this.http.post(`${environment.API}/api/v1/usuario/search`, dataUser).pipe(take(1),
    catchError(error=>{
      if(error){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      }
       return of([]);

     }))


  }
}
