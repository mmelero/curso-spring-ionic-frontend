import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/Cliente.DTO";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{
    constructor(public http: HttpClient,
                public storage: StorageService){

    }

    findByEmail(email: string){
        let token = this.storage.getLocalUser().token;
        let autHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            //passar o cabeçalho para a requisição.
            {'headers': autHeader});
    }

    findById(id: string){
        let token = this.storage.getLocalUser().token;
        let autHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/${id}`,
            //passar o cabeçalho para a requisição.
            {'headers': autHeader});
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: ClienteDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
           observe: 'response',
           responseType: 'text'
           
        }
        );
    }
}