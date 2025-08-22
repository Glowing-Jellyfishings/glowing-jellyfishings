document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    alert(`You clicked on ${tile.textContent}`);
  });
});
