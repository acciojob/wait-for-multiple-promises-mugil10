const output = document.getElementById("output");

function createPromise() {
  const startTime = performance.now();
  const delay = Math.floor(Math.random() * 3) + 1;

  return new Promise(function(resolve) {
    setTimeout(function() {
      const endTime = performance.now();
      const actualTime = (endTime - startTime) / 1000;

      resolve({
        delay: delay,
        actualTime: actualTime
      });
    }, delay * 1000);
  });
}

const startTime = performance.now();

const promise1 = createPromise();
const promise2 = createPromise();
const promise3 = createPromise();

Promise.all([promise1, promise2, promise3])
  .then(function(results) {
    const totalTime = (performance.now() - startTime) / 1000;

    output.innerHTML = "";

    results.forEach(function(result, index) {
      const row = document.createElement("tr");

      const promiseCell = document.createElement("td");
      promiseCell.textContent = "Promise " + (index + 1);

      const timeCell = document.createElement("td");
      timeCell.textContent = result.delay;

      row.appendChild(promiseCell);
      row.appendChild(timeCell);

      output.appendChild(row);
    });

    const totalRow = document.createElement("tr");

    const totalCell = document.createElement("td");
    totalCell.textContent = "Total";

    const totalTimeCell = document.createElement("td");
    totalTimeCell.textContent = totalTime.toFixed(3);

    totalRow.appendChild(totalCell);
    totalRow.appendChild(totalTimeCell);

    output.appendChild(totalRow);
  });