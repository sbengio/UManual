import { Component } from '@angular/core';
import { VideoService } from './shared/services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'umanual';

  constructor(public videoService:VideoService){

  }

  ngOnInit(){

    

    
    
    
  }
}
