# Inputs

Check [Demo](https://drastraa.github.io/Inputs/).

- `data-icon` attribute is using [Material Icons](https://fonts.google.com/icons "Material icons reference")
- How to use:

  1. Add this code to `<head>` tag.

     ```html
     <script src="js/r-inputs.js"></script>
     <link rel="stylesheet" href="css/r-inputs.css" />
     ```

  2. Create instences of the class for each input.

## Text Input

- To disable input, simply add `disabled` to `<input>`
- `<label>` is optional
- Add `.rtlI` to `.tInput` when using **rtl** input

```html
<p class="tInput">
  <input type="text" id="ID" name="" placeholder="" />
  <label for="ID" data-icon="">LABEL</label>
</p>
```

```javascript
document.querySelectorAll(".tInput").forEach((tInput) => {
  new TInput(tInput);
});
```

## Checkbox / Radio

- To disable input, simply add `disabled` to `<input>`

### Checkbox

```html
<div class="cInput">
  <input type="checkbox" name="" id="ID" />
  <label for="ID"><span class="label">LABEL</span></label>
</div>
```

```javascript
document.querySelectorAll(".cInput").forEach((cInput) => {
  new CInput(cInput);
});
```

### Radio

```html
<div class="rInput">
  <input type="radio" id="ID" name="" />
  <label for="ID"><span class="label">LABEL</span></label>
</div>
```

```javascript
document.querySelectorAll(".rInput").forEach((rInput) => {
  new RInput(rInput);
});
```

## File Input

```html
<p class="fInput">
  <input id="ID" type="file" name="" multiple />
  <label for="ID" data-icon="">Choose File</label>
</p>
```

```javascript
document.querySelectorAll(".fInput").forEach((fInput) => {
  new FInput(fInput);
});
```

### Expanded version of File Input

1. In **multiple** file select mode, `data-expand="ELEMENT-ID"` attribute can be added to `.fInput` for showing selected files in detail. _(optional)_

2. Then create the target element

```html
<p id="ELEMENT-ID"></p>
```

## Button Input

### Button Class

#### BInput properties

- `this.type` set to either `input` or `button` depending on element type.
- `this.input` set to either `<input>` or `<button>` element. depending on element type.

#### BInput methods

- Method `this.onClick(function, pend=false)`

  - Pass the custom function to run on click.
  - Set `pend` to `true` to active PENDING mode on click. Unpend it by calling `this.unpend()`.

- Method `this.fetch(url, method = "GET", data = {}, contentType = "application/json")`

  - Returns the promise

- Method `this.progress(tenths)`
  - Shows the loading on the button

##### bInput.fetch() Use example

```javascript
let button = new BInput(bInput);
button.onClick(() => {
  button
    .fetch("https://reqres.in/api/register", "POST", {
      email: "eve.holt@reqres.in",
      password: "pistol",
    })
    .then((response) => {
      if (response.ok && response.status === 200) {
        button.setStatus("success");
        return response.json();
      } else {
        button.setStatus("fail");
        return response.json();
      }
    })
    .then((result) => {
      // Result
    })
    .catch((err) => {
      button.setStatus("fail");
      // Error handling
    });
}, true);
```

#### BInput Usage

- Add `.clickPend` class to `bInput` for activating PENDING mode on click.

- Buttons can be assigned with **Only Icon**. (automatic)

  - This can be done manually by adding `drs-bInput--IconOnly` to the `.bInput`.

- Using `<input>`:

  ```html
  <div class="bInput">
    <input id="ID" type="" value="" />
    <label for="ID" data-icon="">LABEL</label>
  </div>
  ```

- Using `<button>`:

  ```html
  <div class="bInput">
    <button id="ID" type=""></button>
    <label for="ID" data-icon="">LABEL</label>
  </div>
  ```

```javascript
document.querySelectorAll(".bInput").forEach((bInput) => {
  new BInput(bInput);
});
```

## Todo

- [x] `fetch` function on buttons
- [x] mixins
- [x] Only-Icon button
