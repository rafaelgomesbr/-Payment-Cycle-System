const BillingCycle = require("./billingCycle");
const _ = require("lodash");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });

BillingCycle.after("post", sendErrorsOrNext).after("put", sendErrorsOrNext);

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle;
  if (bundle.errors) {
    var errors = parseErrors(bundle.errors);
    res.status(500).json({ errors });
  } else {
    next();
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = [];
  _.forIn(nodeRestfulErrors, (error) => errors.push(error.message));
  return errors;
}
 
BillingCycle.route("countDocuments", function (req, res, next) {
  BillingCycle.countDocuments(function (e, value) {
    if (e) {
      res.status(500).json({ erros: [e] });
    } else {
      res.json({ value });
    }
  });
});

module.exports = BillingCycle;
