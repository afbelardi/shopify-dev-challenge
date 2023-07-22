class CollectionTabs extends HTMLElement {
    constructor() {
      super();
     
      document.addEventListener("DOMContentLoaded", function(event) {
        const desktopTabs = this.querySelectorAll('.tabs-desktop li');
        const firstTab = desktopTabs[0];
        firstTab.classList.add('active');

        const firstTitle = firstTab.querySelector('.collection_titles');
        firstTitle.classList.add('active');
       
      })
    }
    }     
    
    

    
  
  
  customElements.define('collection-tabs', CollectionTabs);