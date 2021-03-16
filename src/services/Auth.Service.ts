import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/Credenciais.DTO";
import { LocalUser } from "../models/local_User";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient,
                public storage: StorageService ){

    }
    authenticate(creds: CredenciaisDTO){

        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string){
        let tok = authorizationValue.substr(7);
        let user: LocalUser = {
            token: tok
        } ;
        this.storage.setlocalUser(user);
    }

    logout(){
        this.storage.setlocalUser(null);
    }
}