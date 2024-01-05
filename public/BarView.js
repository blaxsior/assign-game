export class BarView {
    constructor(circleElem, textElem, width, from, to) {
        this.circle = circleElem;
        this.text = textElem;
        this.barWidth = width;
        this.base = -from;
        this.length = to - from;
    }

    render(value) {
        // const barWidth = document.querySelector('#bar-container').offsetWidth;
        // const circle = document.querySelector('#arrow');
        // const text = document.querySelector('#bar-text');

        const position = (value + this.base) / this.length * this.barWidth;
        this.circle.style.left = position + 'px';
        this.text.textContent = value;
    }
}