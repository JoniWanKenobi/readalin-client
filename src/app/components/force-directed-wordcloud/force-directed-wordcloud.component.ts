import { Component, OnInit, Input } from '@angular/core';

import { D3DirectedGraphService } from '../../services/d3-directed-graph.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-force-directed-wordcloud',
  templateUrl: './force-directed-wordcloud.component.html',
  styleUrls: ['./force-directed-wordcloud.component.css']
})
export class ForceDirectedWordcloudComponent implements OnInit{
  @Input() nodes: any;
  @Input() links: any;
  @Input() category: string;

  width: any = window.innerWidth;
  height: any = window.innerHeight;

  graphDisplaying: boolean = false;
  changeLog: any = [];

  constructor(private fdGraph: D3DirectedGraphService) { }

  ngOnInit() {
    this.draw();
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
