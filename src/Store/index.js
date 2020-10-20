import { observable, computed, action } from "mobx";
import React from "react";

class Store {
  @observable allPaperList = [];
  @observable hoveredPaper = '';
  @observable isHovered = false;
  @observable selectedPaper = '';
  @observable isSelected = false;

  @action setAllPaper(papers) {
    this.allPaperList = papers;
  }
  @action hoverPaper(paper) {
    this.hoveredPaper = paper;
    this.isHovered = true;
  }
  @action cancleHoverPaper() {
    this.isHovered = false;
  }
  @action clickPaper(paper) {
    this.selectedPaper = paper;
    this.isSelected = true;
  }
  @action cancelSelectPaper() {
    this.isHovered = false;
  }
}