import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MantenedoresService } from '../../services/mantenedores.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  constructor(
    private mansv : MantenedoresService,
    private toastr: ToastrService
  ){
  }

  ngOnInit(): void {
    this.getMetricas();

  }

  widgets :any=[];
  getMetricas(){
    this.mansv.getWidgets().subscribe((r:any)=>{
      console.log(r);
      this.widgets = r.map((value:any)=>{

        const assets = {
          background : '',
          iconBg : ''
        };
        switch (value.DisciplineName){
          case 'MMA' :
            assets.background = 'bg-danger';
            assets.iconBg = 'bgl-danger'
          break;
          case 'Boxeo' :
            assets.background = 'bg-success';
             assets.iconBg = 'bgl-success'

          break;
          case 'Kick Boxing' :
            assets.background = 'bg-info';
             assets.iconBg = 'bgl-info'
          break;
          case 'Clases defensa personal' :
            assets.background = 'bg-warning';
             assets.iconBg = 'bgl-warning'
          break;

          case 'BJJ' :
            assets.background = 'bg-dark';
             assets.iconBg = 'bgl-dark'
          break;
        }

        return {
          ...value,
          assets
        }
      });
      console.log(this.widgets);
    })
  }

}
