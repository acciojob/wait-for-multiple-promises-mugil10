const output = document.getElementById("output");

output.innerHTML = `
  <tr>
    <td colspan="2">Loading...</td>
  </tr>
`;

function createPromise() {
  const startTime = performance.now();
  const delay = Math.floor(Math.random() * 3) + 1;

  return new Promise(function(resolve) {
    setTimeout(function() {
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;

      resolve(timeTaken);
    }, delay * 1000);
  });
}

const promise1 = createPromise();
const promise2 = createPromise();
const promise3 = createPromise();

Promise.all([promise1, promise2, promise3]).then(function(results) {
  output.innerHTML = "";

  results.forEach(function(time, index) {
    output.innerHTML += `
      <tr>
        <td>Promise ${index + 1}</td>
        <td>${time.toFixed(3)}</td>
      </tr>
    `;
  });

  const totalTime = Math.max(...results);

  output.innerHTML += `
    <tr>
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    </tr>
  `;
});