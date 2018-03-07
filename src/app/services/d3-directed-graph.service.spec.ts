import { TestBed, inject } from '@angular/core/testing';

import { D3DirectedGraphService } from './d3-directed-graph.service';

describe('D3DirectedGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3DirectedGraphService]
    });
  });

  it('should be created', inject([D3DirectedGraphService], (service: D3DirectedGraphService) => {
    expect(service).toBeTruthy();
  }));
});
