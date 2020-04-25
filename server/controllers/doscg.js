const doscgModel = require("../models/doscg");

exports.getXYZ = (req, res, next) => {
  let input = req.query.input;
  input = input.split(",");
  res.json(doscgModel.findXYZ(input));
};

exports.getBC = (req, res, next) => {
  let input = req.query.input;
  input = input.split(",");
  res.json(doscgModel.findBC(input));
};

exports.navMap = (req, res, next) => {
  doscgModel.navMap(req.query.origin, req.query.destination).then((map) => {
    res.send(Buffer.from(map.data, 'binary').toString('base64'))
  });
};

exports.autoPlace = (req, res, next) => {
  doscgModel.autoPlace(req.query.input).then((r) => {
    console.log(r.data);

    res.json(r.data);
  });
};
