import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategriaDTO } from "../../models/Categoria.DTO";
import { Observable } from "rxjs/Rx";
import { stringify } from "@angular/core/src/util";

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){
    }
    findAll() : Observable<CategriaDTO[]> {
        return this.http.get<CategriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}