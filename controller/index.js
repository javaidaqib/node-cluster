export const simpleRoute = (req, res) => {
  res.json({ msg: "Response from a simple route" });
};

export const computationallyExpensiveRoute = (req, res) => {
  const iterator = 50000000;
  let ans = 0;
  for (let i = 0; i < iterator; i++) {
    ans = ans + iterator;
  }

  res.json({ msg: `Calculated value of the expensive route is ${ans}` });
};
