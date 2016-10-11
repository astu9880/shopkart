/**
 * Created by astitwa on 10/9/16.
 */

/*TODO: Delete an item from cart if the item doesn't exist in the database anymore*/

function attachHandlers() {
    $('.incr').on('click',function (){

        var key=$(this).attr('name');
        addItem(key);
    });
    $('.decr').on('click',function () {
        var key=$(this).attr('name');
        delItem(key);
    })

}

$(function () {
    showData();
    $('.item').on('click',function () {
        var thisItem=$(this);

        thisId=thisItem.attr('id');
        name=thisItem.next().html();
        price=thisItem.next().next().html();

        console.log(thisId+name+price);
        addItem(thisId,name,price);
    });

});
// USE SEMATICS UI: CARD | SEMANTICS UI
//data elements-> name,price,quantity

function showData() {
    var data=localStorage.getItem('data');
    if(!data)
    {
        return;
    }

    data=JSON.parse(data);
    console.log(data);
    var allCartItems='';
    var i=1;
    var total=0;
    for(var key in data)
    {
        total+=(data[key][2]*data[key][1]);
        if(data[key][2]==0)
            continue;
        allCartItems+=
            ('<tr>' +
            '<td>'+i+'</td>' +
            '<td>'+data[key][0]+'</td>' +
            '<td>'+data[key][1]+'</td>' +
            '<td><input class="circular ui icon button decr" type="button" value="-" name="' +
            key+'">'+data[key][2]+' <input class="circular ui icon button incr" type="button" value="+" name="' +
            key+'"></td>' +
            '<td>'+(data[key][1]*data[key][2])+'</td>' +
            '</tr>');
        i++;
    }
    allCartItems+=('<tr><td colspan="4"><b>Grand Total</b></td><td>'+total+'</td></tr>');
    $('#front-cart').html(allCartItems);
    attachHandlers();
}

function addItem(thatId,name,price){
    var data=localStorage.getItem('data');
    if(!data)
    {
        data={};
    }
    else
        data=JSON.parse(data);

    if(!data[thatId])
        data[thatId]=[name,price,1];
    else
    {
        data[thatId][2]++;
    }
    localStorage.setItem('data',JSON.stringify(data));
    showData();
}
function delItem(thatId){
    var data=localStorage.getItem('data');
    data=JSON.parse(data);
    data[thatId][2]--;
    localStorage.setItem('data',JSON.stringify(data));
    showData();
}
