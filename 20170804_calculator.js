$(function() { // Routine format; put all your jQuery initialisation inside
    $('#amount').keyup(function() { //只要输入改变就可以输出结果
        // $('#calculate').click(function() { // Set the mouse click event hander for element "#calculate" 
        // Normal Javascript here
        // Do whatever you want
        var amount = $('#amount').val();
        var unit = $('#unit').val();
        var total = +amount + +unit; //parseInt(amount) + parseInt(unit)如果是加法需要将字符串转换为数字
        $('#total').val(total);
    });

    $('#unit').keyup(function() { //只要输入改变就可以输出结果
        // $('#calculate').click(function() { // Set the mouse click event hander for element "#calculate" 
        // Normal Javascript here
        // Do whatever you want
        var amount = $('#amount').val();
        var unit = $('#unit').val();
        var total = +amount + +unit; //parseInt(amount) + parseInt(unit)如果是加法需要将字符串转换为数字
        $('#total').val(total);
    });
});