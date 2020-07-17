import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications';
// import 'rxjs/Rx';
// import {Observable} from 'rxjs';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http:HttpClient,private toastr:ToastrManager) { }
  downloadFile(file:String){
    var body = {filename:file};

    return this._http.post(`${apiUrl}/file/download`,body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}
  get_all_files_names(){
    return this._http.get(`${apiUrl}/file/getFilesNames`);
  }
  delete_file(file:string){
    var body = {filename:file};
    return this._http.post(`${apiUrl}/file/delete`,body,{
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
  });
  }
  downloadOtherDocumentFile(file:String){
    var body = {filename:file};

    return this._http.post(`${apiUrl}/file/download-other-document`,body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}
  get_all_other_documents_files_names(){
    return this._http.get(`${apiUrl}/file/get-other-document-files-names`);
  }
  delete_other_document_file(file:string){
    var body = {filename:file};
    return this._http.post(`${apiUrl}/file/delete-other-document`,body,{
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
  });
  }
  get_uploaded_pdf(file:string){
    var body = {filename:file};
    return this._http.post(`${apiUrl}/file/file`,body,{
      responseType : 'arraybuffer',
      headers:new HttpHeaders().append('Content-Type','application/json')
  })
  }
  get_latest_uploaded_other_document_file(){
    //  var body = {filename:file};
    return this._http.get(`${apiUrl}/file/other-document-latest`,{
      responseType : 'arraybuffer',
      headers:new HttpHeaders().append('Content-Type','application/json')
  });
  }

}
