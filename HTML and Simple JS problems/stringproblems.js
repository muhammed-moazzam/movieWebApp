function landscape() {
  let valleys = "";
  let hills = "";

  function flat(size) {
    for (let count = 0; count < size; count++){
      valleys += "_";
      hills += " ";
	}
  }

  function hill(size) {
    valleys += "/";
    hills += " ";
    for (let count = 0; count < size; count++){
      valleys += " ";
      hills += "_";
	}
    valleys += "\\";
    hills += " ";
  }

  //START BUILD SCRIPT
  flat(3);
  hill(4);
  flat(6);
  hill(1);
  flat(1);
  //END BUILD SCRIPT

  let result = hills + "\n" + valleys;

  return result;

}

console.log("")
console.log(landscape())
