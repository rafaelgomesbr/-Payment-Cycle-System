//(function () {
angular
  .module("primeiraApp")
  .controller("BillingCycleCtrl", [
    "$http",
    "$location",
    "msgs",
    "tabs",
    BillingCycleController,
  ]);

function BillingCycleController($http, $location, msgs, tabs) {
  const vm = this;
  const url = "http://localhost:3003/api/billingCycles";

  vm.refresh = function () {
    const page = parseInt($location.search().page) || 1;
    $http
      .get(`${url}?skip=${(page - 1) * 10}&limit=10`)
      .then(function (response) {
        vm.billingCycle = { credits: [{}], debts: [{}] };
        vm.billingCycles = response.data;
        vm.calculateValues();

        $http.get(`${url}/count`).then(function (response) {
          vm.pages = Math.ceil(response.data.value / 10);
          console.log("pages =", vm.pages);
          tabs.show(vm, { tabList: true, tabCreate: true });
        });
      });
  };

  vm.convert = function () {
    let postJson = vm.billingCycle;
    let data = {};

    Object.defineProperty(data, "name", {
      value: postJson.name,
    });
    Object.defineProperty(data, "month", {
      value: postJson.month,
    });
    Object.defineProperty(data, "year", {
      value: postJson.year,
    });

    for (let item in postJson.credits) {
      let { name, value } = postJson.credits[item];
      let creditsStringN = `credits[${item}][name]`;
      let creditsStringV = `credits[${item}][value]`;
      incrementObjetc(data, creditsStringN, creditsStringV, name, value);
    }

    for (let item in postJson.debts) {
      let { name, value } = postJson.debts[item];
      let debtsStringN = `debts[${item}][name]`;
      let debtsStringV = `debts[${item}][value]`;
      incrementObjetc(data, debtsStringN, debtsStringV, name, value);
    }

    function incrementObjetc(data, atrb1, atrb2, name, value) {
      Object.defineProperty(data, [atrb1], {
        value: name,
      });
      Object.defineProperty(data, [atrb2], {
        value: value,
      });
    }
     return data;
  };

  const data = {
      name: "Abril/70",
      month: 3,
      year: 2000,
      "credits[0][name]": "Salario Teste2",
      "credits[0][value]": "1700",
      "debts[0][name]": "Academi",
      "debts[0][value]": "5060",
      "debts[0][status]": "PAGO",
    }


  vm.create = function () {
    const form = vm.convert();

    $http({
      method: "POST",
      url: url,
      data: JSON.stringify(form),
    })
      .then(function (response) {
        vm.refresh();
        msgs.addSuccess("Operação realizada com sucesso!");

        console.log(form);
      })
      .catch(function (response) {
        // msgs.addError(response.data.errors)
        console.log(form);

        console.log("Erro");
      });
  };

  vm.showTabUpdate = function (billingCycle) {
    vm.billingCycle = billingCycle;
    vm.calculateValues();
    tabs.show(vm, { tabUpdate: true });
  };

  vm.showTabDelete = function (billingCycle) {
    vm.billingCycle = billingCycle;
    vm.calculateValues();
    tabs.show(vm, { tabDelete: true });
  };

  vm.update = function () {
    const updateUrl = `${url}/${vm.billingCycle._id}`;
    $http
      .put(updateUrl, vm.billingCycle)
      .then(function (response) {
        vm.refresh();
        msgs.addSuccess("Operação realizada com sucesso!");
      })
      .catch(function (response) {
        msgs.addError(response.data.errors);
      });
  };

  vm.delete = function () {
    const deleteUrl = `${url}/${vm.billingCycle._id}`;
    $http
      .delete(deleteUrl, vm.billingCycle)
      .then(function (response) {
        vm.refresh();
        msgs.addSuccess("Operação realizada com sucesso!");
      })
      .catch(function (response) {
        msgs.addError(response.data.errors);
      });
  };

  vm.addCredit = function (index) {
    vm.billingCycle.credits.splice(index + 1, 0, {});
  };

  vm.cloneCredit = function (index, { name, value }) {
    vm.billingCycle.credits.splice(index + 1, 0, { name, value });
    vm.calculateValues();
  };

  vm.deleteCredit = function (index) {
    if (vm.billingCycle.credits.length > 1) {
      vm.billingCycle.credits.splice(index, 1);
      vm.calculateValues();
    }
  };

  vm.addDebt = function (index) {
    vm.billingCycle.debts.splice(index + 1, 0, {});
  };

  vm.cloneDebt = function (index, { name, value, status }) {
    vm.billingCycle.debts.splice(index + 1, 0, { name, value, status });
    vm.calculateValues();
  };

  vm.deleteDebt = function (index) {
    if (vm.billingCycle.debts.length > 1) {
      vm.billingCycle.debts.splice(index, 1);
      vm.calculateValues();
    }
  };

  vm.calculateValues = function () {
    vm.credit = 0;
    vm.debt = 0;

    if (vm.billingCycle) {
      vm.billingCycle.credits.forEach(function ({ value }) {
        vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
      });

      vm.billingCycle.debts.forEach(function ({ value }) {
        vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
      });
    }

    vm.total = vm.credit - vm.debt;
  };

  vm.refresh();
}
//})();
