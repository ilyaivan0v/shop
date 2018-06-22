var cart = {}; //моя корзина

$('document').ready(function () {
    loadGoods();
    checkCart();

});

function loadGoods() {
    //загружаем товары на страницу
    $.getJSON('goods.json',function (data) {
        var out = '';
        out ='<a class="green" href=cart.html>Корзина</a>';
        for (var key in data){
            out+='<div class="single-goods">';
            out+='<h3>'+data[key]['name']+'</h3>'; //имя товара
            out+='<p>Цена: '+data[key]['cost']+'</p>'; //цена товара
            out+='<p>'+data[key]['description']+'</p>'; //описание товара
            out+='<img src="'+data[key].image+'">';  //изображение товара
            out+='<button class="add-to-cart" data-art="'+key+'">Купить</button>'; //кнопка "Купить"
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart(){
    //добавление товара в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined){
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );    //сохраняется значение корзины между загрузками файла

}

function checkCart() {
    //провека наличия корзины в localStorage
    if (localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

