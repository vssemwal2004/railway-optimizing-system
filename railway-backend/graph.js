const railwayGraph = {
  Dehradun: [
    ["Haridwar", 53.5], ["Rishikesh", 33.8], ["Roorkee", 70], ["Delhi", 250],
  ],
  Haridwar: [
    ["Dehradun", 53.5], ["Rishikesh", 20], ["Roorkee", 30], ["Delhi", 200], ["Lucknow", 500],
  ],
  Rishikesh: [
    ["Dehradun", 33.8], ["Haridwar", 20], ["Roorkee", 60], ["New Delhi", 270],
  ],
  Roorkee: [
    ["Dehradun", 70], ["Haridwar", 30], ["Delhi", 220], ["Rishikesh", 60], ["Lucknow", 480],
  ],
  Delhi: [
    ["Dehradun", 250], ["Haridwar", 200], ["Roorkee", 220], ["Lucknow", 520], ["New Delhi", 10],
  ],
  "New Delhi": [
    ["Rishikesh", 270], ["Delhi", 10], ["Lucknow", 600],
  ],
  Lucknow: [
    ["Delhi", 520], ["Haridwar", 500], ["Roorkee", 480], ["New Delhi", 600],
  ],
};

module.exports = railwayGraph;
