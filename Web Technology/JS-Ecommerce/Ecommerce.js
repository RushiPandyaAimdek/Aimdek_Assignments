// variable declaration
let imageURL;
let products = [];
let cart = [];

// getting image path
function loadImage(e) {
    imageURL = URL.createObjectURL(e.target.files[0]);
}

// adding product to productlist
function addProduct() {
    let name = document.getElementById('ProductName');
    let description = document.getElementById('ProductDescription');
    let quantity = document.getElementById('ProductQuantity');
    let price = document.getElementById('ProductPrice');
    let image = document.getElementById('ProductImage');

    //for validation
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

        //making inputbox empty after inserting product
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

// creating productlist structure
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

// add product to cart items
function btnAddToCart(productID) {
    swal("Please enter quantity", {
        content: "input",
    })
        .then((quantity) => {
            if (quantity > parseInt(products[productID].productquantity)) {
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
                        cartQuantity: parseInt(quantity),
                        cartPrice: products[productID].productprice,
                        carttotal: parseInt(quantity * products[productID].productprice)
                    }
                    //for adding quantity in same product
                    let flag = true;
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].idInPRoductlist == productID) {
                            flag = false;
                            cart[i].cartQuantity = cart[i].cartQuantity + parseInt(quantity);
                            cart[i].carttotal = cart[i].cartQuantity * products[productID].productprice;
                        }
                    }
                    if (flag) cart.push(cartItem);
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

// creating cart structure
function loadcart() {
    const carts = document.getElementById('cartItem');
    carts.innerHTML = "";

    if (cart.length != 0) {
        //dispalying grandtotal
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

// delete item from cart
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

// delete item from productlist
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