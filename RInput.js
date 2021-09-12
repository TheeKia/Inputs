// All inputs parent class
class Input {
  static DRS_INPUTS = [];

  constructor(parent, isInput = false) {
    try {
      this.parent = isInput ? parent.parentElement : parent;
      this.input = this.parent.querySelector("input")
        ? this.parent.querySelector("input")
        : this.parent.querySelector("button");
      this.label = this.parent.querySelector("label");
    } catch (err) {
      console.log(err);
      return;
    }
    Input.DRS_INPUTS.push(this);
  }

  static darkThemeAll(TF = true) {
    Input.DRS_INPUTS.forEach((input) => {
      input.parent.classList.toggle("drs-darkTheme", TF);
    });
  }

  darkTheme(TF = true) {
    this.parent.classList.toggle("drs-darkTheme", TF);
    return this;
  }
}

// Switch, Checkbox, Radio Parent Class
class SRC extends Input {
  constructor(parent, isInput = false) {
    super(parent, isInput);

    this.checkBox = document.createElement("div");
    this.checkBox.setAttribute("class", "drs-check-box");
    this.label.prepend(this.checkBox);

    // Add pending element
    this.pendEl = document.createElement("div");
    this.pendEl.setAttribute("class", "PEND_EL");
    this.pendEl.innerHTML = "autorenew";
  }
  pend() {
    this.parent.classList.add("PENDING");
  }
  unpend() {
    this.parent.classList.remove("PENDING");
  }
  setChecked(status) {
    this.input.checked = status;
    this.unpend();
  }

  /* ********** HERE ********** */
  // I pass the function that checks for the status to this method
  onClick(fn, pend = false) {
    this.input.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (pend) this.pend();
      fn();
    });
    return this;
  }
}

// Radio input class
class RInput extends SRC {
  constructor(parent, isInput = false) {
    super(parent, isInput);

    this.parent.classList.add("rInput");
    this.checkBox.appendChild(this.pendEl);
  }
}

/* ********** Checking example  ********** */
const radio = new RInput(light.querySelector("#radioElement"));
radio.onClick(() => {
  // Does Not work
  console.log(radio.input.checked); // Always returns true

  // Works
  setTimeout(() => {
    console.log(radio.input.checked); // Works correctly
  }, 0);
});
