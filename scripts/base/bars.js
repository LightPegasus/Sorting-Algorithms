class Bar {
    constructor({backgroundColor = "white", borderRadius = 0, height = 0, heightPercentage = false, id = 0, order, value}) {
        this.div = document.createElement("div");
        this.div.id = id;
        this.div.style.order = order;
        this.div.style.flexGrow = 1;
        this.div.style.position = "relative";
        this.div.style.boxSizing = "border-box";
        this.div.style.display = "inline-block";
        this.div.style.backgroundColor = backgroundColor;
        this.div.style.borderTopLeftRadius = borderRadius + "px";
        this.div.style.borderTopRightRadius = borderRadius + "px";
        this.div.style.height = heightPercentage ? height + "%" : height + "px";
    }
}

class Display {
    constructor({colorBarSelect = "red", colorBarDefault = "white", iterationDelay = 2, maxValue = 100}) {
        this.array;
        this.maxValue = maxValue;
        this.isSorted = false;
        this.iterationDelay = iterationDelay;
        this.div = document.getElementsByClassName("box")[0];
        this.colorBarSelect = colorBarSelect;
        this.colorBarDefault = colorBarDefault;
    }

    setup(div) { div.appendChild(this.div); }
    setBar(bar) { this.div.appendChild(bar.div); }
    clearBars() { Array.from(this.div.children).forEach(ele => { ele.remove(); }); }

    shuffleArray() {
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]]; 
        }
    }

    fillArray(count) {
        this.array = new Array(parseInt(count));
        for (let i = 0; i < count; i++) { this.array[i] = i; }
        this.shuffleArray();
    }

    fill(count) {
        let bar;
        this.isSorted = false;
        this.clearBars();
        this.fillArray(count);
        for (let i = 0; i < this.array.length; i++){
            bar = new Bar({ backgroundColor: "white",
                height: (this.array[i] / count * 100),
                heightPercentage: true, order: i, id: i, value: this.array[i]
            });
            this.setBar(bar);
        }
    }

    swap(id1, id2) {
        let firstElement = document.getElementById(id1);
        let secondElement = document.getElementById(id2);

        // using the order property, will change the order of the blocks
        [firstElement.style.order, secondElement.style.order] = [secondElement.style.order, firstElement.style.order];

        // need to change the ids of the blocks
        [firstElement.id, secondElement.id] = [secondElement.id, firstElement.id];
    }

    paintBar(id, color) { document.getElementById(id).style.backgroundColor = color; }

    async paintBarRange(id1, id2, color) {
        for (let i = id1; i < id2; i++) {
            this.paintBar(i, color);
            await delay(this.iterationDelay)
        }
    }

    async changeBarHeight(id, height) {
        let ele = document.getElementById(id);
        ele.style.height = height + "%";
    }

    async bubbleSort() {
        await bubbleSort(this.array);
        this.isSorted = true;
    }
    async insertionSort() {
        await insertionSort(this.array);
        this.isSorted = true;
    }
    async selectionSort() {}
    async mergeSort() {}
    async quickSort() {}

}