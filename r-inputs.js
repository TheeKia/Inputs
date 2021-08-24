class TInput {
  constructor(tInput) {
    this.tInput = tInput;
    this.input = tInput.querySelector("input");
    this.label = tInput.querySelector("label");

    if (!this.input) {
      console.warn("Something went wrong in Input Class", tInput);
      return;
    } else if (!this.label) {
      this.tInput.classList.add("NOLABEL");
    }

    if (this.input.value.length > 0) {
      this.active();
    }
    this.input.addEventListener("focus", () => {
      this.active();
    });
    this.input.addEventListener("focusout", () => {
      this.deactive();
    });

    // Detecting if Autofilled

    tInput.addEventListener("animationstart", (e) => {
      if (e.animationName === "startActivation") {
        this.autofill();
      }
    });
    this.input.addEventListener("change", () => {
      this.removeAutofill();
    });
  }

  active() {
    if (!this.tInput.classList.contains("ACTIVE")) {
      this.tInput.classList.add("ACTIVE");
    }
  }
  deactive() {
    if (this.input.value.length === 0) {
      this.tInput.classList.remove("ACTIVE", "AUTOFILL");
    }
  }
  autofill(value = null) {
    this.active();
    if (!this.tInput.classList.contains("AUTOFILL")) {
      this.tInput.classList.add("AUTOFILL");
    }
    if (value) {
      this.input.value = value;
    }
  }
  removeAutofill() {
    if (this.tInput.classList.contains("AUTOFILL")) {
      this.tInput.classList.remove("AUTOFILL");
    }
  }
}

class CInput {
  constructor(cInput) {
    this.cInput = cInput;
    this.input = cInput.querySelector("input");
    this.label = cInput.querySelector("label");

    this.createLabelBox();
  }
  createLabelBox() {
    let span = document.createElement("span");
    span.setAttribute("class", "cr-box");
    span.innerHTML =
      '<svg viewBox="0 0 78.6 62.85"><polyline pathLength="50" points="4.95 32.25 25.65 52.95 73.65 4.95"/></svg>';
    this.label.prepend(span);
  }
}
class RInput {
  constructor(rInput) {
    this.rInput = rInput;
    this.input = rInput.querySelector("input");
    this.label = rInput.querySelector("label");

    this.createLabelBox();
  }

  createLabelBox() {
    let span = document.createElement("span");
    span.setAttribute("class", "cr-box");
    this.label.prepend(span);
  }
}

class FInput {
  constructor(fInput) {
    this.fInput = fInput;
    this.input = fInput.querySelector("input");
    this.label = fInput.querySelector("label");

    this.defaultLabel = this.label.innerHTML;
    this.initiate();

    if (this.fInput.dataset.expand) {
      this.expand = true;
      this.expandElement = document.getElementById(this.fInput.dataset.expand);
      this.expandElement.classList.add("fI-expand");
      this.expandElement.innerHTML = "";
    } else {
      this.expand = false;
      this.expandElement = null;
    }
  }

  initiate() {
    this.input.addEventListener("input", () => {
      let files = this.input.files;

      if (files.length > 1) {
        // Multiple files selected
        this.activate();

        let totalSize = 0;
        for (let file of files) {
          totalSize += file.size;
        }
        totalSize = this.formatSize(totalSize);

        this.label.innerHTML = `${files.length} files <span class='fI-detail'>${totalSize}</span>`;

        if (this.expand) {
          for (let file of files) {
            let p = document.createElement("p");
            let size = this.formatSize(file.size);
            p.innerHTML = `${file.name} <span class='fI-detail'>${size}</span>`;
            this.expandElement.appendChild(p);
          }
        }
      } else if (files.length === 1) {
        // One file selected
        this.activate();

        let originalName = files[0].name;
        // Size handling
        let size = this.formatSize(files[0].size);

        if (this.expand) {
          let p = document.createElement("p");
          p.innerHTML = `${originalName} <span class='fI-detail'>${size}</span>`;
          this.expandElement.innerHTML = "";
          this.expandElement.appendChild(p);

          this.label.innerHTML = `1 file <span class='fI-detail'>${size}</span>`;
        } else {
          // Short name handling
          let name = "";
          this.label.title = originalName;
          if (originalName.length > 25) {
            name =
              originalName.slice(0, 16) +
              "..." +
              originalName.slice(name.length - 6);
          }

          this.label.innerHTML = `${name} <span class='fI-detail'>${size}</span>`;
        }
      } else {
        // Nothing selected
        this.deactivate();
        this.label.innerHTML = this.defaultLabel;
        if (this.expand) {
          this.expandElement.innerHTML = "";
        }
      }
    });
  }

  activate() {
    if (!this.fInput.classList.contains("active")) {
      this.fInput.classList.add("active");
    }
  }
  deactivate() {
    if (this.fInput.classList.contains("active")) {
      this.fInput.classList.remove("active");
    }
  }

  formatSize(size) {
    const unit = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (size >= 1000) {
      size /= 1000;
      unitIndex++;
    }
    size = size.toString().slice(0, 3);
    return size + unit[unitIndex];
  }
}

// tInput
document.querySelectorAll(".tInput").forEach((tInput) => {
  new TInput(tInput);
});
// cr-Input
document.querySelectorAll(".cInput").forEach((cInput) => {
  new CInput(cInput);
});
document.querySelectorAll(".rInput").forEach((rInput) => {
  new RInput(rInput);
});
// Input type file
document.querySelectorAll(".fInput").forEach((fInput) => {
  new FInput(fInput);
});

// Submit inputs (sInput)
function pendButton(element, disableAll = false) {
  if (!element.classList.contains("Active")) {
    element.classList.add("Active");
    element.querySelector("label").classList.add("label-active");
  }
  if (disableAll) {
    document.querySelectorAll(".sInput").forEach((sI) => {
      if (!sI.classList.contains("Active")) {
        sI.classList.add("temporary-disabled");
      }
    });
    document.querySelectorAll(".bInput").forEach((sI) => {
      if (!sI.classList.contains("Active")) {
        sI.classList.add("temporary-disabled");
      }
    });
  }
}
function resolveButton(element) {
  if (element.classList.contains("Active")) {
    element.classList.remove("Active");
    element.querySelector("label").classList.remove("label-active");
  }

  const temporaryDisabled = document.querySelectorAll(".temporary-disabled");
  if (temporaryDisabled.length > 0) {
    temporaryDisabled.forEach((element) => {
      element.classList.remove("temporary-disabled");
    });
  }
}
// .pendOnClick
document.querySelectorAll(".pendOnClick").forEach(function (element) {
  element.addEventListener("click", () => {
    pendButton(element);
  });
});

document.querySelectorAll("form").forEach(function (form) {
  form.addEventListener("submit", function () {
    pendButton(form.querySelector(".sInput"));
  });
});
