import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoClienteService } from './services/tipo-cliente.service'
import { take } from 'rxjs/operators';
import { TipoClienteModel } from './../../../Models/tipoCliente.model';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-tipo-cliente',
  templateUrl: './tipo-cliente.component.html',
  styleUrls: ['./tipo-cliente.component.scss']
})
export class TipoClienteComponent implements OnInit {
  tipoClientes = []
  public temp: Array<object> = [];
  public columns: Array<object>;
  /********PROPPIEDAD PARA LA TABLA******** */
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  constructor(
    private _tipoClienteService: TipoClienteService
  ) {  }

  ngOnInit(): void {
    this.columns = [
      { name: "Id", prop: "idTipoCliente" },
      { name: "Descripcion", prop: "descripcion" }
    ]
    this.getTipoCliente()
  }

  public getTipoCliente() {
    this._tipoClienteService.getTipoCliente().subscribe((cursos: Array<TipoClienteModel>) => {
      this.tipoClientes = cursos.filter((item) => item.activo !== 0)
      this.temp = this.tipoClientes;
    })
  }

  Descargar_CSV() {
    this._tipoClienteService.getCSV().pipe(
      take(1),
    )
      .subscribe((csv: any) => {
        const a = document.createElement("a");
        csv = this.ConvertToCSV(csv);
        const blod = new Blob([csv], { type: 'text/csv' }),
          url = window.URL.createObjectURL(blod);
        a.href = url;
        let fecha = new Date();
        a.download = "cursos_" + fecha.toLocaleDateString() + ".csv";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }
  ConvertToCSV(objArray) {
    let text = Object.keys(objArray[0]).toString();
    text +='\n';
    for(let i in objArray){
      text += Object.values(objArray[i]).toString() + "\n"
    }
    return text
  }

}
