import { Injectable } from '@angular/core';
import * as d3 from "d3";

@Injectable()
export class D3DirectedGraphService {

  nodes: any;
  links: any;

  width: any; //window.innerWidth;
  height: any; //window.innerHeight;

  svg: any; 

  linkForce: any;
  simulation: any;

  linkElements: any;
  nodeElements: any;
  textElements: any;

  dragDrop: any;
  zoom: any;


  constructor() { }

  setNodes(nodes:any){
    //sets nodes
    this.nodes = nodes;
  }

  setLinks(links){
    //set links
    this.links = links;
  }

  fontScale(size: any){
    const scale: any = d3.scaleLinear().range([20, 80]);
    scale.domain([
      d3.min(this.nodes, (d: any) => d.salience),
      d3.max(this.nodes, (d: any) => d.salience)
    ]);

    return scale(size);
  }

  colorScale(score: any){
    const scale: any = d3.scaleLinear<string>().range(['red', 'grey', 'green']);
    scale.domain([-1, 0, 1]);

    return scale(score);
    
  }

  getSentimentColor(score: any){
    if(score >= 0.1){
      return 'green';
    } else if(score <= -0.1){
      return 'red';
    } else {
      return 'blue';
    }
  }

  svgInit(){
    //initializes svg element
    this.svg = d3.select('#container').append('svg');
      
  }

  
  setSize(width, height){
    //sets height and width
    this.width = width;
    this.height = height;
    this.svg.attr('width', this.width).attr('height', this.height)
      
  }



  defineLinkForce(){
    this.linkForce = d3
      .forceLink()
      .id((link: any) => link.id )
      .strength((link: any) => link.strength )
  }

  defineSimulation(){
    this.simulation = d3
      .forceSimulation()
      .force('link', this.linkForce)
      .force('charge', d3.forceManyBody().strength(-10))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius((d:any) =>  this.fontScale(d.salience) * 2))
  }

  mountLinks(){
    this.linkElements = this.svg.append('g')
      .attr("class", "links")
      .selectAll("line")
      .data(this.links)
      .enter().append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "rgba(255, 255, 255)")
  }

  mountNodes(){
    this.nodeElements = this.svg
      .append('g')
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.nodes)
      .enter().append("circle")
      .attr("r", (d)=> this.fontScale(d.salience))
      .attr("fill", 'white')
  }

  mountText(){
    this.textElements = this.svg.append('g')
      .attr("class", "texts")
      .selectAll("text")
      .data(this.nodes)
      .enter().append("text")
      .text((node) =>  this.truncateString(node.name, 20))
      .attr('font-family', 'Roboto')
      .attr("font-size", (d)=> this.fontScale(d.salience))
      .attr('text-anchor', 'middle')
      .attr('fill', (node)=> this.getSentimentColor(node.score))
      .on('click', this.handleClick)      
  }

  truncateString(str, length){
    if(str.length <= length){
      return str;
    } else {
      return str.substring(0, length) + '...'
    }
  }

  handleClick(d){
    console.log(d.salience);
  }

  simulationStart(){
    this.simulation.nodes(this.nodes).on('tick', () => {
      this.nodeElements
        .attr('cx', function (node) { return node.x })
        .attr('cy', function (node) { return node.y })
      this.textElements
        .attr('x', function (node) { return node.x })
        .attr('y', function (node) { return node.y })
      this.linkElements
        .attr('x1', function (link) { return link.source.x })
        .attr('y1', function (link) { return link.source.y })
        .attr('x2', function (link) { return link.target.x })
        .attr('y2', function (link) { return link.target.y })
      });

    this.simulation.force("link").links(this.links);
  }

  defineDragAndDrop(){
    this.dragDrop = d3.drag()
      .on('start', (node:any) => {
        node.fx = node.x
        node.fy = node.y
      })
      .on('drag', (node: any) => {
        this.simulation.alphaTarget(0.7).restart()
        node.fx = d3.event.x
        node.fy = d3.event.y
      })
      .on('end', (node: any) => {
        if (!d3.event.active) {
          this.simulation.alphaTarget(0)
        }
        node.fx = null
        node.fy = null
      })      
    }

    addDragAnddropToNodes(){
      this.textElements.call(this.dragDrop)
    }

    destroy(){
      this.svg.remove()
    }




}
