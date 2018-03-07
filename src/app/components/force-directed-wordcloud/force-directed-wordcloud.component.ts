import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';

import { D3DirectedGraphService } from '../../services/d3-directed-graph.service';

@Component({
  selector: 'app-force-directed-wordcloud',
  templateUrl: './force-directed-wordcloud.component.html',
  styleUrls: ['./force-directed-wordcloud.component.css']
})
export class ForceDirectedWordcloudComponent implements OnInit {
  @Input() nodes: any;
  @Input() links: any;

  width: any = window.innerWidth;
  height: any = window.innerHeight;

  graphDisplaying: boolean = false;

  constructor(private fdGraph: D3DirectedGraphService) { }

  ngOnInit() {
    this.draw();
  }

  ngOnChanges(){
    this.fdGraph.destroy();    
    this.graphDisplaying = false;    
    this.draw();
  }

  ngOnDestroy(){
    if(this.graphDisplaying){
      this.fdGraph.destroy();
    }
    this.graphDisplaying = false;
  }

  draw(){
    this.fdGraph.setNodes(this.nodes);  
    this.fdGraph.setLinks(this.links);  
    this.fdGraph.svgInit();  
    this.fdGraph.setSize(this.width, this.height);  
    this.fdGraph.defineLinkForce();  
    this.fdGraph.defineSimulation();  
    this.fdGraph.mountLinks();  
    this.fdGraph.mountNodes();  
    this.fdGraph.mountText();  
    this.fdGraph.simulationStart();  
    this.fdGraph.defineDragAndDrop();  
    this.fdGraph.addDragAnddropToNodes();
    this.graphDisplaying = true;
  }


}
