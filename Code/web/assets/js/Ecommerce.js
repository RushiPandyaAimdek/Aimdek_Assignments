let imageURL;
let products = [];
let cart = [];

function loadImage(e) {
    imageURL = URL.createObjectURL(e.target.files[0]);
}

function addProduct() {
    let name = document.getElementById('ProductName');
    let description = document.getElementById('ProductDescription');
    let quantity = document.getElementById('ProductQuantity');
    let price = document.getElementById('ProductPrice');
    let image = document.getElementById('ProductImage');

    let temp = true;
    if (name.value.trim() == "" || description.value.trim() == "" || quantity.value.trim() == "" || price.value.trim() == "" || image.value == "") {
        temp = false;
    }

    if (temp) {
        let product = {
            productID: products.length,
            productImage: imageURL,
            productname: name.value,
            poductdescpition: description.value,
            productquantity: quantity.value,
            productprice: price.value
        }
        products.push(product);
        name.value = "";
        description.value = "";
        quantity.value = "";
        price.value = "";
        image.value = null;

        loadProductList();
    }
    else {
        swal("Enter data properly", {
            icon: "warning",
        });
    }
}
function loadProductList() {
    const product = document.getElementById('product');
    product.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
        product.innerHTML += '<div class="col-md-4"><img src="' + products[i].productImage +
            '" style="height: 100%;width:100%;"></div>' +
            '<div class="col-md-8">Name :' + products[i].productname + '<br>Description :' + products[i].poductdescpition +
            '<br>Quantity :' + products[i].productquantity +
            '<br>Price : ' + products[i].productprice +
            '</div><br><div class="col-md-12 d-flex justify-content-end" style="margin-bottom:13px"><input type="button" onclick="btnAddToCart(\'' + products[i].productID + '\')" class="btn btn-sm btn-success" value="Add to cart"><input type="button" onclick="btnRemoveProduct(\'' + i + '\')" class="btn btn-sm btn-warning" style="margin-left:20px" value="Remove"></div>';
    }
}

function btnAddToCart(productID) {
    swal("Please enter quantity", {
        content: "input",
    })
        .then((quantity) => {
            if (quantity > products[productID].productquantity) {
                swal("Enter data properly", {
                    icon: "warning",
                });
                return;
            }
            else if (quantity < 1) {
                swal("Enter data properly", {
                    icon: "warning",
                });
                return;
            }
            else {
                const checkNumber = Number.isInteger(parseInt(quantity));
                if (checkNumber) {
                    products[productID].productquantity = products[productID].productquantity - quantity;

                    let cartItem = {
                        cartID: cart.length,
                        idInPRoductlist: productID,
                        cartName: products[productID].productname,
                        cartImage: products[productID].productImage,
                        cartQuantity: quantity,
                        cartPrice: products[productID].productprice,
                        carttotal: quantity * products[productID].productprice
                    }
                    cart.push(cartItem);
                    loadcart();
                    loadProductList();
                }
                else {
                    swal("Enter data properly", {
                        icon: "warning",
                    });
                    return;
                }
            }
        });
}

function loadcart() {
    const carts = document.getElementById('cartItem');
    carts.innerHTML = "";

    if (cart.length != 0) {

        let grandTotal = 0;
        for (var i = 0; i < cart.length; i++) {
            grandTotal = grandTotal + cart[i].carttotal;
        }
        const gt = document.getElementById('grandTotal');
        gt.innerHTML = '<h4>Grand Total = ' + grandTotal + '</h4>';

        for (var i = 0; i < cart.length; i++) {
            carts.innerHTML += '<div class="col-md-4"><img src="' + cart[i].cartImage +
                '" style="height: 100%;width:100%;"></div><div class="col-md-8"> Name : '
                + cart[i].cartName + '<br>' +
                'Quantity :' + cart[i].cartQuantity + '<br>' + 'Price :' + cart[i].cartPrice + '<br>' + 'Total Price :' + cart[i].carttotal +
                '<br> </div><br><div  style="margin-bottom:13px" class="col-md-12 d-flex justify-content-end"><input type="button" onclick="btnRemoveFromCart(' + i + ',' + cart[i].idInPRoductlist + ',' + cart[i].cartQuantity + ')" class="btn btn-sm btn-warning" value="Remove"></div>';
        }
        document.getElementById("grandTotal").style.display = "block";
    }
    else document.getElementById("grandTotal").style.display = "none";
}

function btnRemoveFromCart(ID, idInPRoductlist, quantity) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                cart.splice(ID, 1);
                products[idInPRoductlist].productquantity = products[idInPRoductlist].productquantity + quantity;
                loadProductList();
                loadcart();
            }
        });
}

function btnRemoveProduct(ID) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                products.splice(ID, 1);
                loadProductList();
            }
        });
}