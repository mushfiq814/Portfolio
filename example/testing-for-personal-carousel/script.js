/**
 * Code help courtesy of Brad Traversy from Traversy Media
 * TypeWriter Class
 * @param {HTMLSpanElement} txtElement - HTML span element
 * @param {Array} words - array containing words
 * @param {Number} wait - time duration for waiting before deleting
 */
class TypeWriter {
  constructor(txtElement, words, wait=3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
  }
  
  type() {
    // Current index of word
    const currentIndex = this.wordIndex%this.words.length;
    // Get the full text inside the words array
    const fullTxt = this.words[currentIndex];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0,this.txt.length-1);
    } else {
      this.txt = fullTxt.substring(0,this.txt.length+1);
    }

    // Define initial typeSpeed
    let typeSpeed = 300;
    // type faster when deleting
    if(this.isDeleting) typeSpeed/=2;

    // If the word is completed
    if (!this.isDeleting && this.txt===fullTxt) {
      this.isDeleting = true;
      // wait for the required time to show the word
      typeSpeed = this.wait;
    }
    // If the word has been deleted fully 
    else if (this.isDeleting && this.txt==="") {
      this.isDeleting=false;
      // go to the next word
      this.wordIndex++;
      // start typing fast again
      typeSpeed = 500;
    }

    // Insert text into the span
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    // run every certain milliseconds
    setTimeout(() => this.type(), typeSpeed);
  }
}

// start initiailization when page finishes loading
document.addEventListener('DOMContentLoaded', init);
// init function
function init() {
  const txtElement = document.querySelector('.spanWord');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement,words,wait);
}