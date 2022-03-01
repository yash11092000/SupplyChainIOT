var contract_address = "0x9256DdFE988fc87223DC2C85c362BF313eec0d7E";
var contract_abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_ProdName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_quantity",
        type: "string",
      },
      {
        internalType: "string",
        name: "_CreatedDate",
        type: "string",
      },
    ],
    name: "CreatedProd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_Date",
        type: "string",
      },
    ],
    name: "DeliveredDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "GetProd",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ProdId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "ProdName",
            type: "string",
          },
          {
            internalType: "string",
            name: "ProdQty",
            type: "string",
          },
          {
            internalType: "string",
            name: "CreatedDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "PickedDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "DeliveredDate",
            type: "string",
          },
          {
            internalType: "bool",
            name: "IsPicked",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "Isdelivered",
            type: "bool",
          },
        ],
        internalType: "struct test.Prod",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Items",
    outputs: [
      {
        internalType: "uint256",
        name: "ProdId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "ProdName",
        type: "string",
      },
      {
        internalType: "string",
        name: "ProdQty",
        type: "string",
      },
      {
        internalType: "string",
        name: "CreatedDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "PickedDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "DeliveredDate",
        type: "string",
      },
      {
        internalType: "bool",
        name: "IsPicked",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "Isdelivered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_Date",
        type: "string",
      },
    ],
    name: "TriggerDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

ethereum.request({
  method: "eth_requestAccounts",
});

var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

var contract = new web3.eth.Contract(contract_abi, contract_address);

var account;
//========================

var CreBtn = document.getElementById("CreateProd");
if (CreBtn) {
  CreBtn.addEventListener("click", function () {
    var id = Date.now();
    var name = document.getElementById("ProdName").value;
    var qty = document.getElementById("ProdQty").value;
    var measure = document.getElementById("qty").value;
    console.log(qty + "" + measure);
    var quantity = qty + "" + measure;
    var currentdate = new Date();
    var datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    if (name.length != 0) {
      web3.eth.getAccounts().then(function (accounts) {
        account = accounts[0];
        console.log(account);
        contract.methods
          .CreatedProd(id, name, quantity, datetime)
          .send({ from: account })
          .then(function (result) {
            console.log(result);
            swal(
              "Good job!",
              `You Product Is Created! and Your ID is ${id}`,
              "success"
            );
          })
          .catch(function (error) {
            console.log(error);
            swal("Oops!", "Something Went Wrong!", "danger");
          });
      });
    } else {
      swal(
        "OOPS!",
        "Try Entering Valid Id or Enter Some Text for Product Name",
        "danger"
      );
    }
  });
}

var fetchBtn = document.getElementById("FetchProd");
if (fetchBtn) {
  var Data = document.getElementById("Date");
  var ProdId = document.getElementById("ProdId");
  var ProdName = document.getElementById("ProdName");
  var ProdQuantity = document.getElementById("ProdQty");
  var ProdCreatedDate = document.getElementById("ProdCreatedDate");
  var ProdIsPicked = document.getElementById("ProdIsPicked");
  var ProdPickedDate = document.getElementById("ProdPickedDate");
  var ProdIsDelivered = document.getElementById("ProdIsDelivered");
  var ProdDeliveredDate = document.getElementById("ProdDeliveredDate");

  fetchBtn.addEventListener("click", function () {
    // console.log("clicked")
    var id = parseInt(document.getElementById("ProdId2").value);
    web3.eth.getAccounts().then(function (accounts) {
      account = accounts[0];
      // console.log(account)
      contract.methods
        .GetProd(id)
        .call({ from: account })
        .then(function (result) {
          // console.log(result.CreatedDate)
          console.log(result);
          // console.log(result.IsCreated);
          ProdId.innerText = "Your Product Id Is :" + result.ProdId;
          ProdName.innerText = "Your Product Name Is :" + result.ProdName;
          ProdQuantity.innerText =
            "Your Product Quantity Is :" + result.ProdQty;
          ProdCreatedDate.innerText =
            "Your Product Is Created at :" + result.CreatedDate;
          ProdIsPicked.innerText = "IsProductPicked:" + result.IsPicked;
          ProdPickedDate.innerText =
            "Your Product Picked at :" + result.PickedDate;
          ProdDeliveredDate.innerText =
            "Your Product DeliveryDate :" + result.DeliveredDate;
          ProdIsDelivered.innerText =
            "IsProductDelived  :" + result.Isdelivered;
        })
        .catch(function (err) {
          swal("Oops!", "Product Not Found!", "danger");
        });
    });
  });
}

var TriggerDel = document.getElementById("TriggerDel");
if (TriggerDel) {
  console.log(TriggerDel);
  TriggerDel.addEventListener("click", function () {
    console.log(TriggerDel);
    var currentdate = new Date();
    var datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    var id = parseInt(document.getElementById("ProdId3").value);
    if (id > 0) {
      web3.eth.getAccounts().then(function (accounts) {
        account = accounts[0];
        console.log(account);
        contract.methods
          .TriggerDelivery(id, datetime)
          .send({ from: account })
          .then(function (result) {
            console.log(result);
            swal("Nice!", "Product JourNey Started!", "success");
          })
          .catch(function (err) {
            console.log(
              "Sorry Some Error Occured OR Your Product ",
              id,
              "is Further in SupplyChain"
            );
            swal(
              "OOps!",
              "Product Is not present or Further In Chain",
              "danger"
            );
            console.log(error);
          });
      });
    } else {
      swal("OOps!", "Enter Valid Id", "danger");
    }
  });
}

var DeliveryStatus = document.getElementById("DeliveryStatus");
if (DeliveryStatus) {
  DeliveryStatus.addEventListener("click", function () {
    var currentdate = new Date();
    var datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    var id = parseInt(document.getElementById("ProdId4").value);

    web3.eth.getAccounts().then(function (accounts) {
      account = accounts[0];
      console.log(account);
      contract.methods
        .DeliveredDate(id, datetime)
        .send({ from: account })
        .then(function (result) {
          console.log(result);
          swal("Yay!", "Product Delivered", "success");
        })
        .catch(function (err) {
          console.log(err);
          swal("OOps!", "Product Is not present or Further In Chain", "danger");
        });
    });
  });
}

var form = document.getElementById("form-id");
if (form) {
  document.getElementById("btn-id").addEventListener("click", function () {
    form.submit();
  });
}
