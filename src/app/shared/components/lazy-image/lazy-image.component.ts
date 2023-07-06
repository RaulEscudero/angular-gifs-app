import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit{

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property required');
  }

  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  public hasLoaded:boolean=false;

  onLoad(){
    console.log('Image loaded');
    this.hasLoaded=true;
  }
}
